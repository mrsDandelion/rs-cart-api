import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { Carts, CartItems, Orders } from './entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: `${process.env.DATABASE_HOST}`,
            port: +`${process.env.DATABASE_PORT}`,
            username: `${process.env.DATABASE_USERNAME}`,
            password: `${process.env.DATABASE_PASSWORD}`,
            database: `${process.env.DATABASE_NAME}`,
            entities: [Carts, CartItems, Orders],
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
            // synchronize: false,
            ssl: {
                rejectUnauthorized: false
            }
        }),
        TypeOrmModule.forFeature([Carts, CartItems, Orders]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}