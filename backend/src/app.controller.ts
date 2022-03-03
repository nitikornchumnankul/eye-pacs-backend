import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local/local-auth.guard';
import { RegisterDto } from './users/dto/register.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @Post('register')
  register(
    @Body() registerDto: RegisterDto
  ): Promise<any> {
    return this.usersService.register(registerDto)
  }

  @Get('export')
  exportToCSV(): Promise<any> {
    return this.appService.exportToCSV()
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any
  ): Promise<any> {
    return this.authService.login(req.user)
  }

  // Delete all
  @UseGuards(JwtAuthGuard)
  @Delete('delete-all-table/:eye_photo_id')
  deleteAllTable(
    @Param('eye_photo_id') eye_photo_id: string
  ): Promise<string> {
    return this.appService.deleteAllTable(eye_photo_id)
  }
}
