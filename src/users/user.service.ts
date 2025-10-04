import {BadRequestException, Injectable} from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import {InjectRepository} from "@nestjs/typeorm"
import { Repository } from "typeorm";
import {User} from "./user.entity"



@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  public async register(registerDto: RegisterDto){
    const {email , password,username} = registerDto;

    const userFromDb = await this.usersRepository.findOne ({where: {email}})
    if(userFromDb) throw new BadRequestException("user ALREADY exist")

  }
}