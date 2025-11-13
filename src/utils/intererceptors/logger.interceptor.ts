import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap,map } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log("Before Route Handler")

    // return next.handle().pipe(tap(() => console.log("After Route Handler")))
    return next.handle().pipe(map((dataFromRouteHandler) => {
      const {password, ...otherData} = dataFromRouteHandler;
      return {...otherData}
    }))
 
  }

}