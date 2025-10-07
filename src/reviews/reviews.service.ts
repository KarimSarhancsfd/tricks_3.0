import {
  NotFoundException,
  Injectable,
  Inject,
  ForwardReference,
  forwardRef,
} from '@nestjs/common';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { UsersService } from 'src/users/user.service';


type Reviews = {
  id: number;
  products: string;
  review: string;
  rating: number;
};
@Injectable()
export class ReviewsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  private reviews: Reviews[] = [
    { id: 1, products: 'book', review: 'good', rating: 5 },
    { id: 2, products: 'pen', review: 'bad', rating: 2 },
    { id: 3, products: 'laptop', review: 'excellent', rating: 4.5 },
  ];

  //GET: http://localhost:5000/api/reviews
  //GET: ~/api/reviews

  getAllreviews() {
    return this.reviews;
  }
  //post single element

  public createRview(body: CreateReviewDto) {
    // console.log(body);
    //     return body
    const newReview: Reviews = {
      id: this.reviews.length + 1,
      products: body.products,
      review: body.review,
      rating: body.rating,
    };
    this.reviews.push(newReview);
    return newReview;
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

  public getReviewById(id: number) {
    const review = this.reviews.find((r) => r.id === id);
    if (!review) {
      throw new NotFoundException('Review not found', {
        description: 'no reviews found',
      });
    }
    return review;
  }

  public updateReview(body: UpdateReviewDto) {
    const index = this.reviews.findIndex((r) => r.id);

    if (index === -1) {
      throw new NotFoundException('Review not found', {
        description: 'no reviews found',
      });
    }

    // Update the existing review in-place
    this.reviews[index] = {
      ...this.reviews[index],
      ...body,
    };

    return this.reviews[index]; // Return the updated review
  }

  public deleteReview(id: number) {
    const review = this.reviews.find((r) => r.id);
    if (!review) {
      throw new NotFoundException('Review not found', {
        description: 'no reviews found',
      });
    }
    return { message: 'product deleted sucessfully' };
  }
}
