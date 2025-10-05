import {BadRequestException, Injectable} from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import {InjectRepository} from "@nestjs/typeorm"
import { Repository } from "typeorm";
import {User} from "./user.entity"
import * as bcrypt from 'bcryptjs'



@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  public async register(registerDto: RegisterDto){
    const {email , password,username} = registerDto;

    const userFromDb = await this.usersRepository.findOne ({where: {email}})
    if(userFromDb) throw new BadRequestException("user ALREADY exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    let newUser = this.usersRepository.create({
      email,
      username,
      password: hashedPassword 
    })

    newUser = await this.usersRepository.save(newUser)

    //@todo -> geneate jwt token

    return newUser;


  }
}