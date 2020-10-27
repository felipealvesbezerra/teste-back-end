import IPageableDTO from '@shared/dtos/IPageableDTO';
import IPageable from '@shared/entities/IPageable';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IProduct from '../entities/IProduct';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<IProduct>;
  save(data: IProduct): Promise<IProduct>;
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  deleteById(id: string): Promise<void>;
  findByPage(data: IPageableDTO): Promise<IPageable<IProduct>>;
}
