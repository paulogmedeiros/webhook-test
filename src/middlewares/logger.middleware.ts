import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const time = Date.now() - start;
      this.logger.log(
        `${req.method} IP ${req.ip} ${req.originalUrl} ${res.statusCode} - ${time}ms - ${new Date().toISOString()}`,
      );
    });

    next();
  }
}
