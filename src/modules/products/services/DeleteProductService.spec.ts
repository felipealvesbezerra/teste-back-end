import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import DeleteProductService from './DeleteProductService';

let deleteProduct: DeleteProductService;
let productsRepository: IProductsRepository;

describe('Delete Product Service', () => {
  beforeEach(() => {
    productsRepository = new FakeProductsRepository();
    deleteProduct = new DeleteProductService(productsRepository);
  });

  it('should delete a product', async () => {
    const product = await productsRepository.create({
      name: 'Roupa',
      price: 542,
    });
    await deleteProduct.execute(product.id);
    expect(await productsRepository.findById(product.id)).toEqual(undefined);
  });

  it('should not delete a product that not exists', async () => {
    await expect(
      deleteProduct.execute('id-que-nao-existe'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
