import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { ip, method, originalUrl: url } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('close', () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${responseTime}ms ${contentLength} - ${userAgent} ${ip}`,
      )
    })

    next();
  }
}