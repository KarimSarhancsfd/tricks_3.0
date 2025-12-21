import { UsersService } from './../users/user.service';
import {
  NotFoundException,
  Injectable,
  Inject,
  ForwardReference,
  forwardRef,
  ForbiddenException,
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

  public async update(reviewId:number, userId:number, dto: UpdateReviewDto){
    const review = await this.getReviewBy(reviewId)
    if(review.user.id !== userId)
      throw new ForbiddenException("access denied, you are not allowed")

    review.rating = dto.rating ?? review .rating;
    review.comment = dto.comment ?? review.comment;

    return this.reviewRepository.save(review);
   
  }


  /**
   * get single review by id
   * @param id id of the review
   * @returns review from the database
   */


  private async getReviewBy(id: number){
     const review = await this.reviewRepository.findOne({where: {id}})
    if(!review) throw new NotFoundException("review not found")
      return review;
  }

  public async Delete(id:number, reviewId:number){
    const review = await this.getReviewBy(reviewId)

     if(!review){
       throw new NotFoundException("review not found")
      return review;
    }else{
      const removereview = await this.reviewRepository.remove(review) 
    }

  }

  
}
