import {
  NotFoundException,
  Injectable,
  Inject,
  ForwardReference,
  forwardRef,
} from '@nestjs/common';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { UsersService, UserService } from 'src/users/user.service';
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
   private readonly UserService: UserService

  ) {}

  
}
