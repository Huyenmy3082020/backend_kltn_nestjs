import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';
import { RegisterUserDto, UserResponseDto } from './auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../base/common.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body('idToken') idToken: string) {
    return this.authService.login(idToken);
  }
  @Public()
  @Post('register')
  @ApiOperation({
    operationId: 'registerUser',
    description: 'Register a new user with email and password',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
    type: ErrorResponse,
  })
  async register(@Body() userRegisterDto: RegisterUserDto) {
    return this.authService.register(userRegisterDto);
  }
}
