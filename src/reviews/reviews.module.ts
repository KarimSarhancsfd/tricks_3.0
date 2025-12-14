import { Module, forwardRef } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
  imports: [
    forwardRef(() => UsersModule),  // Use forwardRef here too
    forwardRef(() => ProductsModule),  // Use forwardRef here too
    TypeOrmModule.forFeature([Review]),
    JwtModule,
  ],
})
export class ReviewsModule {}