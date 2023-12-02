import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  constructor() {}
  @Get()
  getHello(): string {
    return 'sas!!!!!!!!!!!!!!!!!!!!'
  }

  // @Get([ '', 'ping' ])
  // healthCheck(): any {
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //   };
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('api/auth/login')
  // async login(@Request() req) {
  //   const token = this.authService.login(req.user, 'basic');

  //   return  {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: {
  //       ...token,
  //     },
  //   };
  // }

  // @UseGuards(BasicAuthGuard)
  // @Get('api/profile')
  // async getProfile(@Request() req) {
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: {
  //       user: req.user,
  //     },
  //   };
  // }
}
