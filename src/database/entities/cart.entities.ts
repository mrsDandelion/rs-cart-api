import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CartItems } from './cart-item.entities';
import { Orders } from './orders.entities';

@Entity('carts')
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id', nullable: false })
  userId: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'ORDERED'],
    nullable: false,
  })
  status: 'OPEN' | 'ORDERED';

  @OneToMany(() => CartItems, (cartItem) => cartItem.cartId)
  items: CartItems[];
}
