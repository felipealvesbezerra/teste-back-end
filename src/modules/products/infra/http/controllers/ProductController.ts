import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import FindProductsPageable from '@modules/products/services/FindProductsPageable';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price } = req.body;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      price,
    });

    return res.status(201).json(classToClass(product));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductService);
    await deleteProduct.execute(id);

    return res.status(204).json();
  }

  public async all(req: Request, res: Response): Promise<Response> {
    const { take, page } = req.query;

    const findPageable = container.resolve(FindProductsPageable);

    const takeNumber = (take as unknown) as number;
    const pageNumber = (page as unknown) as number;
    const products = await findPageable.execute({
      take: takeNumber,
      page: pageNumber,
    });

    return res.status(200).json(products);
  }
}
