import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { RegisterUserDto } from './auth.dto';
import { UserRepository } from '../users/user.repository';
import { UserService } from '../users/user.service';
import { UserStatus } from '../users/user.entity';
import { TransactionService } from 'src/database/transaction.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseAdmin: FirebaseAdminService,
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
  ) {}

  async login(idToken: string) {
    try {
      const decodedToken = await this.firebaseAdmin
        .getAuth()
        .verifyIdToken(idToken);

      // Lấy thông tin user từ decodedToken
      const user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
      };

      return {
        accessToken: idToken, // client đã có token từ Firebase
        user,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
  async register(userRegisterDto: RegisterUserDto) {
    const saveUser = {
      email: userRegisterDto.email,
      username: userRegisterDto.username,
    };

    const existingUser = await this.userService.getUser(userRegisterDto.email);
    if (existingUser) {
      throw new BadRequestException('AUTH.USER_ALREADY_EXISTS');
    }

    const registerUser = await this.userService.registerUser(saveUser);
    await this.firebaseAdmin.getAuth().createUser({
      email: userRegisterDto.email,
      password: userRegisterDto.password,
      displayName: userRegisterDto.username,
    });

    return {
      success: true,
      message: 'REGISTER.SUSSESSFULY',
      data: registerUser,
    };
  }
}
