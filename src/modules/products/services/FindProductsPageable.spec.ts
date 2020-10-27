import 'reflect-metadata';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import FindProductsPageable from './FindProductsPageable';

let findProducts: FindProductsPageable;
let productsRepository: IProductsRepository;

describe('Find Product Price Service', () => {
  beforeEach(() => {
    productsRepository = new FakeProductsRepository();
    findProducts = new FindProductsPageable(productsRepository);
  });

  it('should find all products', async () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 11; i++) {
      // eslint-disable-next-line no-await-in-loop
      await productsRepository.create({
        name: `Roupa ${i}`,
        price: 542,
      });
    }

    expect(await findProducts.execute({ page: 1, take: 5 })).toMatchObject({
      pages: 3,
      currentPage: 1,
      totalResults: 11,
    });
  });
});
