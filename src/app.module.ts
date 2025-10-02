import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'rxjs';
import { Review } from './reviews/review.entity';
import { User } from './users/user.entity';
@Module({
  // impotant Note: this is a typo, we canot inject in forroot
  //   imports: [ProductsModule,  ReviewsModule, UsersModule, TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     database: 'nestjs-app-db',
  //     username: 'postgres',
  //     password: '123456789',
  //     port: 5432,
  //     host: 'localhost',
  //     synchronize: false,//only for development
  //     entities:[Product]

  //   }),
  //    ConfigModule. forRoot({
  //     isGlobal: true,
  //     envFilePath: ['.env', '.env.test'],
  //   }),

  // ],

   imports: [
    ProductsModule,
    ReviewsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT') || 5432,
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        synchronize: process.env.NODE_ENV !== 'production',
        entities: [Product, Review, User], // Add your entities here
      }),
    }),
  ],
  
})
export class AppModule {}

//go to package jason file and change the start:dev script to make it dynamic
// change this => "start:dev": "set NODE_ENV=development & nest start --watch",//in package jason file to make it dynamic
// "start:dev": "export NODE_ENV=development && nest start --watch", // For Unix-based systems
// make the project environment dynamic
// "start:dev": "nest start --watch", // IGNORE this line, it is not dynamic
// "start:dev": "set NODE_ENV=development & nest start --watch", // For Windows
// "start:dev": "export NODE_ENV=development && nest start --watch", // 
