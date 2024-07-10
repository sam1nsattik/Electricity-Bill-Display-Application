import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimestampMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date();
    if (req.method === 'POST') {
        req.body.created_at = now;
        req.body.updated_at = now;
    } else if (req.method === 'PUT') {
        req.body.updated_at = now;
    }

    next();
  }
}
