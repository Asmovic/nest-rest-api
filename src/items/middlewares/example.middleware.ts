import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Example Middleware...');
    const { authorization } = req.headers;

    if(!authorization) throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    if(authorization === 'dfbbdbxfytwrt123') next();
    else
      throw new HttpException('Invalid Authorization Token', HttpStatus.FORBIDDEN);
  }
}
