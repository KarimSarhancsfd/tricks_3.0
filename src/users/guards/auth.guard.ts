import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTPayloadType } from 'src/utils/types';




@Injectable()
export class AuthGuard implements CanActivate{
    constructor (
        private readonly jwtService:JwtService,
        private readonly ConfigService: ConfigService
    ) {}
 async   canActivate(context: ExecutionContext){
        const request: Request =  context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [] ;
        if(token && type === "Bearer"){
            const payload: JWTPayloadType =  await this.jwtService.verifyAsync(
                token, {
                    secret: this.ConfigService.get<string>("JWT_SECRET")
                }
            )

        }else {
            return false;
        }
        return true
        
    }
}