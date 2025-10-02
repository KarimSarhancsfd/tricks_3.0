import { Module , forwardRef} from '@nestjs/common';

import { UsersController } from './users.controller';
import { UserService  } from './user.service';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Import the User entity

//ask your selfe whta doyou want to export from from module from provideer this put it in an exports array where in this case UserService go see then product module to know how the product module will take it(UserService)
@Module({
  controllers: [UsersController],
  providers: [UserService ],
  //  exports:[UserService],
  exports: [UserService], // Export the service so it can be used in other modules
  imports: [forwardRef(() => ReviewsModule), TypeOrmModule.forFeature([User])], // If this module depends on other modules, list them here
  //circular dependency recives and send two directions
  // users receives from reviews
})
export class UsersModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}
