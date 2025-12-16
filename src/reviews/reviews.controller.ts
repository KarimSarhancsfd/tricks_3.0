import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  NotFoundException,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,

} from '@nestjs/common';

import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewsService } from './reviews.service';
import { UsersService } from 'src/users/user.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { AuthRolesGuard } from 'src/users/guards/auth.roles.guard';
import type { JWTPayloadType } from 'src/utils/types';

import { Roles } from 'src/users/decorators/user-role.decorator';
import { UserType } from '../utils/enum';




@Controller('api/reviews')
export class ReviewsController {

    // private ReviewsService: ReviewsService = new ReviewsService(); bad pratisce beacause of strong bounding which means in the parent when i change somthing i nedd to change it here to in each place i used it
    // but in the other hand to avoid this we can use the constructor injection
    // private ReviewsService: ReviewsService;
    // contstructor(ReviewsService: ReviewsService){
    //   this.ReviewsService = ReviewsService;
    // } the same as bellow but below is the best practice
  constructor(private readonly ReviewsService: ReviewsService
    , private readonly userService: UsersService
  )
   {}//Beast practise


  //GET: http://localhost:5000/api/reviews
  //GET: ~/api/reviews
  // @Get()
  // getAllreviews() {
  //   return this.ReviewsService.getAllreviews();
  // }

  //POST: ~/api/review/:productId
  @Post(':productId')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  public updateReview(
    @Param('productId', ParseIntPipe) productId:number,
    @Body() body: UpdateReviewDto,
    @CurrentUser( ) payload: JWTPayloadType,
  ){
    return this.ReviewsService.createReview(productId, payload.id,body)
  }

 
}
