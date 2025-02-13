import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ILoginRequest, ISignupRequest, ILoginResponse, ISignupResponse} from './auth.interface';
import {BadRequestException} from '@nestjs/common';
import {User} from './user.model';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly JwtService: JwtService
  ) {}

  async signup(data: ISignupRequest): Promise<any> {
    try {
      const {name, email, password} = data;
      if (!name){
        new BadRequestException('Name is required');
      }
      if (!email){
        new BadRequestException('Email is required');
      }
      if (!password){
        new BadRequestException('Password is required');
      }
      const user = await this.userModel.findOne({where: {email}});
      if(user){
        new BadRequestException('User already exists');
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      await this.userModel.create({
        name,
        email,
        password: hashedPassword
      } as User);
      return {
        message: 'Signup Success',
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        }
      };
    }catch(err){
      console.error(err);
      return err;
    }
  }

  async login(data: ILoginRequest): Promise<any> {
    try{
      const {email, password} = data;
      if (!email){
        new BadRequestException('Email is required');
      }
      if (!password){
        new BadRequestException('Password is required');
      }
      const user = await this.userModel.findOne({where: {email}});
      if (!user){
        new BadRequestException('User not found');
      }
      const isPasswordMatch = bcrypt.compare(password, user?.password as string);
      if (!isPasswordMatch){
        new BadRequestException('Password is incorrect');
      }
      const payload = {email: user?.email};
      const token = this.JwtService.sign(payload);

      return {
        message: 'Login Success',
        token,
        user: {
          id: user?.id,
          name: user?.name
        },
      };
    }catch(err){
      console.error(err);
      return err;
    }
  }
}
