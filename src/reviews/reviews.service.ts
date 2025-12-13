import { UsersService } from './../users/user.service';
import {
  NotFoundException,
  Injectable,
  Inject,
  ForwardReference,
  forwardRef,
} from '@nestjs/common';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

type Reviews = {
  id: number;
  products: string;
  review: string;
  rating: number;
};

@Injectable()
export class ReviewsService {
  constructor(
   @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
   private readonly productService: ProductsService,
   private readonly UserService:  UsersService 

  ) {}
  


  /**
   * Create new review
   * @param productId  id of the pdoduct
   * @param userId id of the user that created this review
   * @param dto data for creating new review
   * @returns the created review from the data base
   */


  public async createReview(productId:number, userId:number, dto:CreateReviewDto ){
    const product = await this.productService.getsingleProducts(productId);

    const user = await this.UserService.getCurrentUser(userId);

    const review = this.reviewRepository.create({...dto,user,product});

    const result = await  this.reviewRepository.save(review)

    return {
      id:result.id,
      comment: result.comment,
      rating: result.rating,
      createdAt: result.createdAt,
      userId:user.id,
      productId: product.id,
      
      

    }
  }

  
}
