// src/users/user.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    // private readonly config: ConfigService

  ) {}


  /**
   * 
   * @param registerDto 
   * @returns 
   */

  public async register(registerDto: RegisterDto):Promise<AccessTokenType> {
  const { email, password, username } = registerDto;

  // Check if user already exists
  const userFromDb = await this.usersRepository.findOne({ where: { email } });
  if (userFromDb) {
    throw new BadRequestException('User already exists');
  }

  // Validate username
  if (!username || typeof username !== 'string' || username.trim() === '') {
    throw new BadRequestException('Username is required');
  }

  // Validate password
  if (!password || typeof password !== 'string') {
    throw new BadRequestException('Password must be a non-empty string');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save new user
  const newUser = this.usersRepository.create({
    email,
    username,
    password: hashedPassword,
  });

  const savedUser = await this.usersRepository.save(newUser);

 

  const accessToken = await this.generateJWT({id: newUser.id, userType: newUser.userType })

  

  return {accessToken};
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
 * log In user
 * @param loginDto  data from log in to user account
 * @returns JWT(access token)
 */
public async login(loginDto:LoginDto):Promise<AccessTokenType>{
  const {email, password} = loginDto;

  const user = await this.usersRepository.findOne({where: {email}});

  if(!user) throw new BadRequestException("invalid email or password ")
   const isPasswordMatch =  await bcrypt.compare(password,user.password);

  if(!isPasswordMatch) throw new BadRequestException("invalid email or password");
  //@TODO -> GENERATE jwt Token


  const accessToken = await this.generateJWT({id: user.id, userType:user.userType});

  return {accessToken};

}

/**
 * Generate Json Web Token
 * @param payload JWT payload
 * @returns token
 */

private generateJWT(payload: JWTPayloadType) : Promise<string>{
  return this.jwtService.signAsync(payload)
}
}