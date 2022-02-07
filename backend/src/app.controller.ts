import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local/local-auth.guard';
import { RegisterDto } from './users/dto/register.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body() registerDto: RegisterDto
  ): Promise<any> {
    return this.usersService.register(registerDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any
  ): Promise<any> {
    return this.authService.login(req.user)
  }

  // Check payload
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //   return req.user
  // }
}
