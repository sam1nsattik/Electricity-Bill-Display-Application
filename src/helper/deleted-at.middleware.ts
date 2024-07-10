import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DeletedAtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Query1 antes da modificação: ${JSON.stringify(req.query)}`);
    req.query = { ...req.query, deleted_at: null };
    console.log(`Query1 após a modificação: ${JSON.stringify(req.query)}`);
    next();
  }
}
