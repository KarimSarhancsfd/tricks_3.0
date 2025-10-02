import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
  Req,
  Res,
  Header,
  Headers,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
  BadRequestException,
    Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

import { UpdateUserDto } from './dtos/update-user.dto';
import { ReviewsService } from 'src/reviews/reviews.service';

type User = {
  id: number;
  name: string;
  email: string;
};
@Injectable() // this is a decorator that makes the class injectable
export class UserService {
  private user: User[] = [
    { id: 1, name: 'Alice', email: 'kariminstructor@gmail.com' },
    { id: 2, name: 'Bob', email: 'bobstudent@gmail.com' },
    { id: 3, name: 'Charlie', email: 'charlieinstructor@gmail.com' },
  ];

  constructor(
    @Inject(forwardRef(() => ReviewsService))
    private readonly ReviewsService: ReviewsService) {}


  public getAllUsers() {
    return this.user.map((user) => {
      const role = this.getRoleFromEmail(user.email);
      return { ...user, role };
    });
  }

  createUser(body: CreateUserDto) {
    const newUser: User = {
      id: this.user.length + 1,
      // name: body.name,
      // email: body.email
      ...body,
    };
    this.user.push(newUser);
    const role = this.getRoleFromEmail(newUser.email);
    return { ...newUser, role };
  }

  public GetSpecficUser(id: number) {
    const user = this.user.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  updateUser(id: number, body: UpdateUserDto) {
    const user = this.user.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, body);

    const role = this.getRoleFromEmail(user.email);
    return { ...user, role };
  }

  DeleteUser(id: number) {
    const user = this.user.find((u) => u.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private getRoleFromEmail(email: string): 'instructor' | 'student' {
    if (email.includes('instructor')) {
      return 'instructor';
    } else if (email.includes('student')) {
      return 'student';
    } else {
      throw new BadRequestException(
        'Email must include role: "instructor" or "student"',
      );
    }
  }
}
