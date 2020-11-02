import * as Yup from 'yup';

import User from '../schemas/user';

class UserController {
  /**
   * @api { index } /users Index
   * @apiGroup CRUD
   *
   * @apiSuccess { json } Success
   *    HTTP/1.1 200 OK
   */
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  }

  /**
   * @api { store } /users Store
   * @apiParam { string } id User ID
   *
   * @apiGroup CRUD
   *
   * @apiSuccess { String } firs_name     Required
   * @apiSuccess { String } [middle_name] Not required
   * @apiSuccess { String } last_name     Required
   * @apiSuccess { String } [gender]      Not required
   * @apiSuccess { Date }   date_birth    Required
   * @apiSuccess { String } [language]    Not required
   * @apiSuccess { String } [country]     Not required
   * @apiSuccess { Number } [phone]       Not required
   * @apiSuccess { String } email         Required
   * @apiSuccess { String } password      Required
   *
   * @apiSuccess { json } Success
   *    HTTP/1.1 200 OK
   *
   * @apiError { json } Error
   *    HTTP/1.1 400 Bad Request
   *    {
   *      "error": "Error to store user."
   *    }
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      middle_name: Yup.string().notRequired(),
      last_name: Yup.string().required(),
      gender: Yup.string().notRequired(),
      date_birth: Yup.date().required(),
      language: Yup.string().notRequired(),
      country: Yup.string().notRequired(),
      phone: Yup.number().notRequired(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const data = req.body;

    try {
      const user = await User.create(data);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Error to store user.' });
    }
  }

  /**
   * @api { update } /users/:id Update
   * @apiParam { string } id User ID
   *
   * @apiGroup CRUD
   *
   * @apiSuccess { String } firs_name     Required
   * @apiSuccess { String } [middle_name] Not required
   * @apiSuccess { String } last_name     Required
   * @apiSuccess { String } [gender]      Not required
   * @apiSuccess { Date }   date_birth    Required
   * @apiSuccess { String } [language]    Not required
   * @apiSuccess { String } [country]     Not required
   * @apiSuccess { Number } [phone]       Not required
   * @apiSuccess { String } email         Required
   * @apiSuccess { String } password      Required
   *
   * @apiSuccess { String } status Successfully updated data message
   *
   * @apiSuccess { json } Success
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "User deleted successfully."
   *    }
   *
   * @apiError { json } Error
   *    HTTP/1.1 400 Bad Request
   *    {
   *      "error": "Error to delete user."
   *    }
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      middle_name: Yup.string().notRequired(),
      last_name: Yup.string().required(),
      gender: Yup.string().notRequired(),
      date_birth: Yup.date().required(),
      language: Yup.string().notRequired(),
      country: Yup.string().notRequired(),
      phone: Yup.number().notRequired(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const data = req.body;

    try {
      await User.findByIdAndUpdate(req.params.id, data);

      return res.json({ message: 'User updated successfully.' });
    } catch (error) {
      return res.status(400).json({ error: 'Error to update user.' });
    }
  }

  /**
   * @api { delete } /users/:id Delete
   * @apiGroup CRUD
   *
   * @apiSuccess { String } status successfully deleted data message

   * @apiSuccess { json } Success
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "User deleted successfully."
   *    }
   *
   * @apiError { json } Error
   *    HTTP/1.1 400 Bad Request
   *    {
   *      "error": "Error to delete user."
   *    }
   */
  async delete(req, res) {
    try {
      const user = await User.findById(req.params.id);

      user.deleteOne();

      return res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      return res.status(400).json({ error: 'Error to delete user.' });
    }
  }
}

export default new UserController();
