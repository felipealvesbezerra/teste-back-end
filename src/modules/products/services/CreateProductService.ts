import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IProduct from '../entities/IProduct';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price }: ICreateProductDTO): Promise<IProduct> {
    const productsAlreadyExist = await this.productsRepository.findByName(name);

    if (productsAlreadyExist) {
      throw new AppError('Já existe este produto em nosso estoque!');
    }
    const products = await this.productsRepository.create({ name, price });
    return products;
  }
}
