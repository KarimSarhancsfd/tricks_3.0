import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    console.log(`Incoming Request: ${method} ${url}`);

    return next.handle().pipe(
      tap(() =>
        console.log(
          `Response for ${method} ${url} completed in ${Date.now() - now}ms`,
        ),
      ),
    );
  }
}