import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Carts } from './cart.entities';

@Entity('cart_items')
export class CartItems {
  @ManyToOne(() => Carts, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cartId: string;

  @PrimaryColumn('uuid', { name: 'product_id', nullable: false })
  productId: string;

  @Column('int', { name: 'count', nullable: false })
  count: number;
}
