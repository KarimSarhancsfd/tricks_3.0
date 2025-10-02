import {Module, forwardRef} from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
//  import { UsersModule } from 'src/users/users.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { ReviewsService } from 'src/reviews/reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity'; // Importing the Product entity
// GET:  /api/products

// This module imports UsersModule to use UserService in ProductsService
// and exports ProductsService for use in other modules if needed.

@Module({
    controllers:[ProductsController],
    // providers:[ProductsService,ReviewsService],
     //inner dependency
     providers:[ProductsService],
    exports:[ProductsService],
    //  imports:[ ReviewsModule,],
     //outer dependency reciver
        // products receives from reviews

        imports:[forwardRef(() => ReviewsModule) ,TypeOrmModule.forFeature([Product])], // TypeOrmModule.forFeature is used to register the Product entity with TypeORM
}) //decorator 
export class ProductsModule{}