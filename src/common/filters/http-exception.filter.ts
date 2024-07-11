import { 
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch<T>(exception: ExceptionFilter<T>, host: ArgumentsHost) {
    const ctx  = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const message = exception instanceof HttpException
      ? exception.getResponse()
      : "Internal Server Error";

    if (status >= 500) {
      this.logger.error(
        `HTTP Status: ${status}, Error Message: ${JSON.stringify(message)}`,
      );
    } else {
      this.logger.warn(
        `HTTP Status: ${status}, Error Message: ${JSON.stringify(message)}`,
      );
    }

    if (exception instanceof Error) {
      this.logger.error(exception.stack)
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message
    })
  }
}