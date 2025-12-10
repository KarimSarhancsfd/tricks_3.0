
import { Module, forwardRef } from '@nestjs/common';
 import {ReviewsController} from './reviews.controller';
 import { ReviewsService } from './reviews.service';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity'; // Import the Review entity
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers:[ReviewsController ],
  providers: [ReviewsService], // Register the ReviewsService as a provider
  exports: [ReviewsService], // Export the service so it can be used in other modules
  // outer dependancy sender one direction
  // reviews sends to products

  // imports: [forwardRef(() => UsersModule), ProductsModule], 
  // If this module depends on other modules, list them here
   //circular dependency recives and send two directions
  // users receives from reviews

  imports: [ UsersModule,  ProductsModule , TypeOrmModule.forFeature([Review]), JwtModule],
}) //decorator
export class ReviewsModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}