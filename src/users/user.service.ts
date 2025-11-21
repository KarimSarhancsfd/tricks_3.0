// src/users/user.service.ts
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { RegisterDto } from './dtos/register.dto';
import { User } from './user.entity';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import {JWTPayloadType,AccessTokenType} from "../utils/types"
import { UserType } from '../utils/enum';
// import { ConfigService } from '@nestjs/config';
import { UpdatteUserDto } from './dtos/update-user.dto';
import { AuthService } from './guards/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly AuthService:AuthService
    // private readonly config: ConfigService

  ) {}



  
  /**
   *
   * @param registerDto
   * @returns
   */

  public async register(registerDto: RegisterDto): Promise<AccessTokenType> {
    return this.AuthService.register(registerDto)
 
  }






/**
 * Get current user(logged in user)
 * @param id  id of the user logged in user
 * @returns the user from the database
 */

public async getCurrentUser(id:number): Promise<User>{
//  const [type,token] = bearerToken.split(" ");
//  const payload = await this.jwtService.verifyAsync(token, {
//   secret: this.config.get<string>("JWT_SECRET")
//  });

 const user = await this.usersRepository.findOne({where: {id}})
  if(!user) throw new NotFoundException("user not found");
  return user
  // console.log(token)
}


public getAll(): Promise<User[]> {
  return this.usersRepository.find();
}



/**
 * Generate Json Web Token
 * @param payload JWT payload
 * @returns token
 */



/**
 * 
 * @param id id of logged in user
 * @param updateUserDto data for updating the user
 * @returns updated user from the database
 */

public async update(id: number, updateUserDto: UpdatteUserDto){

  const {password, username} = updateUserDto;

  const user = await this.usersRepository.findOne({where: {id}});

    if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }


  user.username = username ?? user.username

  if(password){
  
    user.password = await this.hashPassword(password)
  }

  return this.usersRepository.save(user)
  
}

/**
 * Delete user
 * @param userId id of the user
 * @param payload JWTPayload
 * @returns a success message
 */

public async delete(userId:number, payload: JWTPayloadType){
  const user = await this.getCurrentUser(userId);
  if(user.id === payload?.id || payload.userType === UserType.ADMIN){
    await this.usersRepository.remove(user);
    return {message: 'User has been deleted'}
  }
  throw new ForbiddenException("access denied, you are not allowed")
}



/**
 * Hash password
 * @param password plain text password
 * @returns hashed password
 */
private async hashPassword(password:string): Promise<string>{
  const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}
}