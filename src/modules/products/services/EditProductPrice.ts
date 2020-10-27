import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProduct from '../entities/IProduct';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  productId: string;
  newPrice: number;
}

@injectable()
export default class EditProductPriceService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ newPrice, productId }: IRequest): Promise<IProduct> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('Este produto não existe!');
    }

    product.price = newPrice;
    await this.productsRepository.save(product);
    return product;
  }
}
