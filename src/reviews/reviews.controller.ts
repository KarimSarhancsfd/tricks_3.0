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
} from '@nestjs/common';

import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewsService } from './reviews.service';
import { UserService } from 'src/users/user.service';



@Controller('api/reviews')
export class ReviewsController {

    // private ReviewsService: ReviewsService = new ReviewsService(); bad pratisce beacause of strong bounding which means in the parent when i change somthing i nedd to change it here to in each place i used it
    // but in the other hand to avoid this we can use the constructor injection
    // private ReviewsService: ReviewsService;
    // contstructor(ReviewsService: ReviewsService){
    //   this.ReviewsService = ReviewsService;
    // } the same as bellow but below is the best practice
  constructor(private readonly ReviewsService: ReviewsService
    , private readonly userService: UserService
  )
   {}//Beast practise


  //GET: http://localhost:5000/api/reviews
  //GET: ~/api/reviews
  @Get()
  getAllreviews() {
    return this.ReviewsService.getAllreviews();
  }
  //post single element
  @Post()
  public createRview(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: CreateReviewDto,
  ) {
    // console.log(body);
    //     return body

    return this.ReviewsService.createRview(body);
  }

  //add multiple array with multiple object
  //     @Post()
  // createMultipleReviews(@Body() body: CreateReviewDto[]){
  //     const newReviews: Reviews[] = body.map((item, index) => ({
  //         id: this.reviews.length + index + 1,
  //         products: item.products,
  //         review: item.review,
  //         rating: item.rating
  //     }));
  //     this.reviews.push(...newReviews);
  //     return newReviews;
  // }

  @Get('/:id')
  public getReviewById(@Param('id', ParseIntPipe) id: number) {
   return this.ReviewsService.getReviewById(id);
 
  }

  @Put(':id')
  public updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: UpdateReviewDto,
  ) {
   

    return this.ReviewsService.updateReview; // Return the updated review
  }

  @Delete(':id')
  public deleteReview(@Param('id', ParseIntPipe) id: number) {
  
    return this.ReviewsService.deleteReview(id);
  }
}
