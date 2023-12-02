import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { OrderService } from '../order';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  @Get(':userId')
  async findUserCart(@Param('userId') userId: string) {
    const cart = await this.cartService.findUserCart(userId);

    if (!cart) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'NOT FOUND. TRY NEW',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
      },
    };
  }

  @Post('checkout/:userId')
  async checkout(@Param('userId') userId: string, @Body() body) {
    try {
      const cart = await this.cartService.findUserCart(userId);

      if (!(cart && cart.items.length)) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Cart is empty',
        };
      }

      if (!body.payment || !body.delivery || !body.comments) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Bad data',
        };
      }

      const { id: cartId, items } = cart;

      const total = cart.items.reduce((acc, item) => acc + item.count, 0);

      const order = await this.orderService.createOrder({
        ...body,
        userId,
        cartId,
        items,
        total,
        status: 'OPEN'
      });

      await this.cartService.updateCartStatus(cart.id, 'ORDERED');

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: order,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'BAD_REQUEST',
      };
    }
  }
}
