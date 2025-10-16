import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import {Controller, Post,Body,HttpCode,HttpStatus, Get, Req,Headers,UseGuards} from "@nestjs/common"
import { UsersService } from './user.service';
import { AuthGuard } from './guards/auth.guard';




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

   //GET: ~/api/users/current-user
   @Get("Current-user")
   @UseGuards(AuthGuard)
   public getCurrentUser(@Headers() headers:any) {
    return this.UsersService.getCurrentUser(headers.authorization);

  //  console.log()

  //  return "ok";

   //register->login->take the accestoken from user loginin -> current-user in the headers new key choose authrization nad Bearer+space+ past the token from user login 

   }
} 