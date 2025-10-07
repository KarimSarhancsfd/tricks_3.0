import { RegisterDto } from './dtos/register.dto';
import {Controller, Post,Body} from "@nestjs/common"
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
} 