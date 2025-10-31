import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTPayloadType } from 'src/utils/types';
import { CURRENT_USER_KEY } from 'src/utils/constants';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/utils/enum';
import { UsersService } from '../user.service';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly ConfigService: ConfigService,
    private readonly reflector: Reflector,
    private readonly usersService: UsersService
  ) {} 
  async canActivate(context: ExecutionContext) {
  const roles: UserType[] =   this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()])

  if(!roles || roles.length === 0 ) return false;

    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (token && type === 'Bearer') {
      try {
        const payload: JWTPayloadType = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.ConfigService.get<string>('JWT_SECRET'),
          },
        );
        const user = await this.usersService.getCurrentUser(payload.id)
        if(!user) return false;

        if(roles.includes(user.userType)){
          request[CURRENT_USER_KEY] = payload;
          return true;
        }

        request[CURRENT_USER_KEY] = payload;
      } catch (error) {
       throw new UnauthorizedException("access denied, invalid token")
      }
    } else {
     throw new UnauthorizedException("access denied, no token provided")
    }
    return false;
  }
}
