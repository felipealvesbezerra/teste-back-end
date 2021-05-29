import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/users.repository';
import * as yup from 'yup';
import { AppError } from '../errors/app.errors';
import cpfValidator from '../utils/cpf.validator';

class UsersController {
  async index(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return response.status(200).json(users);
  }

  async show(request: Request, response: Response) {
    const { email } = request.params;
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });
    if (user) {
      return response.status(200).json(user);
    } else {
      throw new AppError('User does not exists!');
    }
  }

  async create(request: Request, response: Response) {
    const {
      first_name,
      middle_name,
      last_name,
      nickname,
      email,
      phone,
      cpf,
      rg,
      state,
      city,
    } = request.body;
    const usersRepository = getCustomRepository(UsersRepository);

    const schema = yup.object().shape({
      first_name: yup.string().required(),
      middle_name: yup.string(),
      last_name: yup.string(),
      nickname: yup.string(),
      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
      phone: yup.string(),
      cpf: yup
        .string()
        .min(14, 'Must be 14 characters')
        .max(14, 'Must be 14 characters')
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Must be an cpf number'),
      rg: yup.string(),
      state: yup
        .string()
        .max(2, 'Must be 2 characters like SP for São Paulo')
        .max(2, 'Must be 2 characters like SP for São Paulo'),
      city: yup.string(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const userAlreadyExist = await usersRepository.findOne({ email });
    if (userAlreadyExist) {
      throw new AppError('User already exists!');
    }

    let validatedCpf;
    if (cpf) {
      const { error, cleanCpf } = cpfValidator(cpf);
      if (error) {
        throw new AppError('CPF number is invalid!');
      } else {
        validatedCpf = cleanCpf;
      }
    }

    try {
      const user = usersRepository.create({
        first_name,
        middle_name,
        last_name,
        nickname,
        email,
        phone,
        cpf: validatedCpf,
        rg,
        state,
        city,
      });
      await usersRepository.save(user);

      return response.status(201).json(user);
    } catch (err) {
      throw new AppError('Sorry, something happened!', 400);
    }
  }

  async update(request: Request, response: Response) {
    const {
      id,
      first_name,
      middle_name,
      last_name,
      nickname,
      email,
      phone,
      cpf,
      rg,
      state,
      city,
    } = request.body;
    const usersRepository = getCustomRepository(UsersRepository);

    const schema = yup.object().shape({
      id: yup.string().required('Id is required'),
      first_name: yup.string(),
      middle_name: yup.string(),
      last_name: yup.string(),
      nickname: yup.string(),
      email: yup.string().email('Must be a valid email'),
      phone: yup.string(),
      cpf: yup
        .string()
        .min(14, 'Must be 14 characters')
        .max(14, 'Must be 14 characters')
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Must be an cpf number'),
      rg: yup.string(),
      state: yup
        .string()
        .max(2, 'Must be 2 characters like SP for São Paulo')
        .max(2, 'Must be 2 characters like SP for São Paulo'),
      city: yup.string(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const user = await usersRepository.findOne({ id });
    if (user) {
      if (email != user.email) {
        const userAlreadyExist = await usersRepository.findOne({ email });
        if (userAlreadyExist) {
          throw new AppError('This email already exists');
        }
      }
      if (cpf) {
        const { error, cleanCpf } = cpfValidator(cpf);
        if (error) {
          throw new AppError('CPF number is invalid!');
        } else {
          user.cpf = cleanCpf;
        }
      }
      user.email = email;
      user.first_name = first_name;
      user.middle_name = middle_name;
      user.last_name = last_name;
      user.nickname = nickname;
      user.phone = phone;
      user.rg = rg;
      user.state = state;
      user.city = city;
    } else {
      throw new AppError('Id not found');
    }

    try {
      await usersRepository.save(user);

      return response.status(200).json(user);
    } catch (err) {
      throw new AppError('Sorry, something happened!', 400);
    }
  }

  async delete(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const { id } = request.body;

    const userAlreadyExist = await usersRepository.findByIds(id);
    if (userAlreadyExist) {
      try {
        await usersRepository.delete(id);
        return response.status(204).json();
      } catch (err) {
        throw new AppError('Sorry, happened something', 400);
      }
    }
    throw new AppError('Id not found');
  }
}

export { UsersController };
