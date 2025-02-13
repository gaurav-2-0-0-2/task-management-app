import {Controller, Post, Body} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ILoginRequest, ILoginResponse, ISignupRequest, ISignupResponse} from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: ISignupRequest): Promise<ISignupResponse> {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: ILoginRequest): Promise<ILoginResponse> {
    return this.authService.login(body);
  }

}
