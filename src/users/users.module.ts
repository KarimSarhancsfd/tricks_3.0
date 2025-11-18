import { Module , forwardRef} from '@nestjs/common';
import { UserController  } from './users.controller';
import { UsersService  } from './user.service';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Import the User entity
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './guards/auth.service';

//ask your selfe whta doyou want to export from from module from provideer this put it in an exports array where in this case UserService go see then product module to know how the product module will take it(UserService)
@Module({
  controllers: [UserController ],
  providers: [UsersService,AuthService ],
  //  exports:[UserService],
  exports: [UsersService], // Export the service so it can be used in other modules
  imports: [forwardRef(() => ReviewsModule), TypeOrmModule.forFeature([User]),JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return{
        global:true,
        secret:config.get<string>("JWT_SECRET"),
        signOptions: {expiresIn:config.get<string>("JWT_EXPIRES_IN")}
      }
    }
  })], // If this module depends on other modules, list them here
  //circular dependency recives and send two directions
  // users receives from reviews
})
export class UsersModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}
