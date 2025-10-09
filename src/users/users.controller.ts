import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import {Controller, Post,Body,HttpCode,HttpStatus} from "@nestjs/common"
import { UsersService } from './user.service';




@Controller("api/users")
export class UserController {
  constructor (
    private readonly UsersService:UsersService
  ) {}


  // GET :~/api/users

  @Post('auth/register')
   public register(@Body() body: RegisterDto) {
    return this.UsersService.register(body);
   }


     @Post('auth/login')//200
     @HttpCode(HttpStatus.OK)//200
   public login(@Body() body: LoginDto) {
    return this.UsersService.login(body);
   }
} 