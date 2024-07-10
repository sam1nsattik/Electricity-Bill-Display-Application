import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class JsonResponseMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    res.setHeader('Content-Type', 'application/json');

    // Realizamos o type casting do objeto `res` para `any`
    const resAny: any = res;

    // Sobrescrevemos o método `json` para formatar a resposta JSON
    resAny.json = function (body: any) {
      const formattedBody = JSON.stringify(body, null, 2);
      resAny.send(formattedBody);
    };

    next();
  }
}
