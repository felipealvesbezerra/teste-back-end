import { Request, Response } from 'express';

import User from '../schemas/User';

class UserController {
  // lista todos os usuários
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find();

    return res.json(users);
  }

  // cria um usuário e retorna os dados recém gerados
  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.create(req.body);

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // atualiza campos e retorna os campos atualizados
  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      await User.findByIdAndUpdate(req.params, req.body);

      const updatedUser = await User.findOne();

      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // deleta um usuário por id
  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const user = req.params;
    await User.deleteOne(user);
    return res.status(204).send();
  }
}

export default new UserController();
