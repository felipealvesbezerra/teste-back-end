import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProduct from '@modules/products/entities/IProduct';
import IPageableDTO from '@shared/dtos/IPageableDTO';
import IPageable from '@shared/entities/IPageable';
import { v4 } from 'uuid';
import IProductsRepository from '../IProductsRepository';

export default class FakeProductsRepository implements IProductsRepository {
  private products: IProduct[] = [];

  public async save(product: IProduct): Promise<IProduct> {
    const productIndex = this.products.findIndex(
      find => find.id === product.id,
    );
    if (productIndex === -1) {
      this.products.push(product);
      return { ...product };
    }

    this.products[productIndex] = product;
    return { ...product };
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = this.products.find(find => find.id === id);
    return product ? { ...product } : undefined;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = this.products.find(find => find.name === name);
    return product ? { ...product } : undefined;
  }

  public async create(data: ICreateProductDTO): Promise<IProduct> {
    const product: IProduct = { id: v4() } as IProduct;

    Object.assign(product, data);
    this.products.push(product);

    return { ...product };
  }

  public async deleteById(id: string): Promise<void> {
    const productIndex = this.products.findIndex(find => find.id === id);
    if (productIndex === -1) {
      return;
    }

    this.products.splice(productIndex, 1);
  }

  public async findByPage({
    page,
    take,
  }: IPageableDTO): Promise<IPageable<IProduct>> {
    const products = this.products.slice(take * (page - 1), take);

    return {
      currentPage: page,
      pages: Math.ceil(this.products.length / take),
      result: [...products],
      totalResults: this.products.length,
    };
  }
}
