import { ReviewsService } from './../reviews/reviews.service';
import {
  Module,
  Get,
  Controller,
  Post,
  Put,
  Delete,
  NotFoundException,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

import { UpdateUserDto } from './dtos/update-user.dto';

import { UserService } from './user.service';

@Controller('/api/users')
export class UsersController {
  // GET: http://localhost:5000/api/users
  // GET: ~/api/users

  //  private userService: UserService = new UserService();
    // private userService: UserService;
  // constructor(userService: UserService) {
  //   this.userService = userService;
  // }

  constructor(private readonly userService: UserService,
    private readonly ReviewsService: ReviewsService
  ) {}



  @Get()
  public getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: CreateUserDto,
  ) {
    return this.userService.createUser(body);
  }

  @Get('/:id')
  public GetSpecficUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.GetSpecficUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  DeleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.DeleteUser(id);
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
