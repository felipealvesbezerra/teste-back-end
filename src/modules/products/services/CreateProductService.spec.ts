import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import CreateProductService from './CreateProductService';

let createProduct: CreateProductService;
let productsRepository: IProductsRepository;

describe('Create Product Service', () => {
  beforeEach(() => {
    productsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(productsRepository);
  });
  it('should create a product', async () => {
    const product = await createProduct.execute({ name: 'Roupa', price: 548 });
    expect(product).toHaveProperty('id');
  });

  it('should not create a product with same name', async () => {
    const name = 'Calçado';
    const price = 4.2;
    await productsRepository.create({ name, price });
    await expect(createProduct.execute({ name, price })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
