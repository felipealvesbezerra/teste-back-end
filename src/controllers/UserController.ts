import { Request, Response } from 'express';
import User from '../models/User';

export default {
  async store(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      phone,
      email,
      age,
      github_username,
      password,
      cpf,
      bio,
      gender
    } = req.body;


    const userFound = await User.findOne({email : email});
    if(userFound) return res.status(401).json({error : "Usuário já existente"})

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      age,
      github_username,
      password,
      cpf,
      bio,
      gender
    })

    return res.json({ message: "User registrado com sucesso", user });
  },

  async index(req: Request, res: Response) {
    const users = await User.find();
    if(users.length === 0) return res.status(401).json({error : "Nenhum usuário encontrado!"});
    return res.json(users);
  },

  async show(req: Request, res: Response) {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.status(401).json({error : "Usuário não encontrado"}); 
    return res.json(user);
  },

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { password } = req.body;

    const user = await User.findById(id);
    if(!user) return res.status(401).json({error : "Usuário não encontrado"}); 

    await User.findByIdAndUpdate({ _id: id }, {
      password
    });
    return res.json({ message: "Dados atualizados com sucesso!", password });
  },

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const user = await User.findById(id);
    if(!user) return res.status(401).json({error : "Usuário não encontrado"}); 

    await User.findOneAndRemove({ _id: id });
    return res.status(201).json({ message: "Usuário deletado!" })
  }
}