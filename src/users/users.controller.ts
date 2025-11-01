import { UserType } from './../utils/enum';


import { LoginDto } from './dtos/login.dto';

import { RegisterDto } from './dtos/register.dto';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthRolesGuard } from './guards/auth.roles.guard';

import { CurrentUser } from './decorators/current-user.decorator';
import type { JWTPayloadType } from '../utils/types';

import {Roles} from "./decorators/user-role.decorator"


@Controller('api/users')
export class UserController {
  constructor(private readonly UsersService: UsersService) {}

  // GET :~/api/users

  @Post('auth/register')
  public register(@Body() body: RegisterDto) {
    return this.UsersService.register(body);
  }

  @Post('auth/login') //200
  @HttpCode(HttpStatus.OK) //200
  public login(@Body() body: LoginDto) {
    return this.UsersService.login(body);
  }

  //  //GET: ~/api/users/current-user
  //  @Get("Current-user")
  //  @UseGuards(AuthGuard)
  //  public getCurrentUser(@Req() request: any) {
  //   const payload = request[CURRENT_USER_KEY]
  //   return this.UsersService.getCurrentUser(payload.id);

  // //  console.log()

  // //  return "ok";

  //  //register->login->take the accestoken from user loginin -> current-user in the headers new key choose authrization nad Bearer+space+ past the token from user login

  //  }

  //  another method for geting current user
  //GET: ~/api/users/current-user
  @Get('Current-user')
  @UseGuards(AuthGuard)
  public getCurrentUser(@CurrentUser() payload: JWTPayloadType) {
    return this.UsersService.getCurrentUser(payload.id);
  }
  

  @Get()
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  public getAllUsers() {
    return this.UsersService.getAll();
  }



}
