import {
    Column,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './cart.entities';

@Entity('orders')
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', { name: 'user_id', nullable: false })
    userId: string;

    @ManyToOne(() => Carts, cart => cart.items)
    @JoinColumn({ name: "cart_id" })
    cartId: string;

    @Column({ type: 'json', default: 'credit_card' })
    payment: any;

    @Column('json', { nullable: true })
    delivery: any;

    @Column('text', { nullable: true })
    comments: string;

    @Column('text')
    status: string;

    @Column('integer')
    total: number;
}