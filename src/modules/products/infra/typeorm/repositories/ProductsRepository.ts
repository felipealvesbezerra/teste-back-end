import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProduct from '@modules/products/entities/IProduct';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IPageableDTO from '@shared/dtos/IPageableDTO';
import IPageable from '@shared/entities/IPageable';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({ where: { name } });

    return product;
  }

  public async deleteById(id: string): Promise<void> {
    const product = await this.ormRepository.findOne(id);
    if (!product) {
      return;
    }

    await this.ormRepository.delete(product);
  }

  public async findByPage({
    page,
    take,
  }: IPageableDTO): Promise<IPageable<IProduct>> {
    const [products, totalResults] = await this.ormRepository.findAndCount({
      skip: (page - 1) * take,
      take,
    });

    return {
      result: products,
      currentPage: page,
      pages: Math.ceil(totalResults / take),
      totalResults,
    };
  }

  public async findByEmail(email: string): Promise<Product | undefined> {
    const findEmail = await this.ormRepository.findOne({ where: { email } });

    return findEmail;
  }

  public async create(userData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(userData);
    await this.ormRepository.save(product);
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    const savedUser = await this.ormRepository.save(product);
    return savedUser;
  }
}
