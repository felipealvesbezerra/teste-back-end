import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
import IProduct from '../../../entities/IProduct';

@Entity('app_products')
export default class Product implements IProduct {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string = v4();

  @Column()
  name: string;

  @Column({ type: 'double' })
  @Transform((value: number) => Number(value.toFixed(2)))
  price: number;
}
