import EditProductPriceService from '@modules/products/services/EditProductPrice';

import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductPriceController {
  public async edit(req: Request, res: Response): Promise<Response> {
    const { id, newPrice } = req.body;

    const editProductPrice = container.resolve(EditProductPriceService);
    const product = await editProductPrice.execute({
      productId: id,
      newPrice,
    });

    return res.status(200).json(classToClass(product));
  }
}
