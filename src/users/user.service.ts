// src/users/user.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { RegisterDto } from './dtos/register.dto';
import { User } from './user.entity';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}


  /**
   * 
   * @param registerDto 
   * @returns 
   */

  public async register(registerDto: RegisterDto) {
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

  return savedUser;
}


public async login(loginDto:LoginDto){
  const {email, password} = loginDto;

  const user = await this.usersRepository.findOne({where: {email}});

  if(!user) throw new BadRequestException("invalid email or password ")
   const isPasswordMatch =  await bcrypt.compare(password,user.password);

  if(!isPasswordMatch) throw new BadRequestException("invalid email or password")

}
}