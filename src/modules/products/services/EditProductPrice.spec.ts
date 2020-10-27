import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import EditProductPriceService from './EditProductPrice';

let editProduct: EditProductPriceService;
let productsRepository: IProductsRepository;

describe('Edit Product Price Service', () => {
  beforeEach(() => {
    productsRepository = new FakeProductsRepository();
    editProduct = new EditProductPriceService(productsRepository);
  });

  it('should edit price of a product', async () => {
    const product = await productsRepository.create({
      name: 'Roupa',
      price: 542,
    });
    await editProduct.execute({ newPrice: 100, productId: product.id });
    expect(await productsRepository.findById(product.id)).toMatchObject({
      price: 100,
    });
  });

  it('should not edit price of a product that not exists', async () => {
    await expect(
      editProduct.execute({ productId: 'id-que-nao-existe', newPrice: 500 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
