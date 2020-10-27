import IPageableDTO from '@shared/dtos/IPageableDTO';
import IPageable from '@shared/entities/IPageable';
import { inject, injectable } from 'tsyringe';
import IProduct from '../entities/IProduct';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class FindProductsPageable {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IPageableDTO): Promise<IPageable<IProduct>> {
    const products = await this.productsRepository.findByPage(
      Object.assign(data, { page: data.page < 1 ? 1 : data.page }),
    );

    return products;
  }
}
