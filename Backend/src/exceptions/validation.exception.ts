import { HttpException, HttpStatus } from '@nestjs/common';

export class Validation_exception extends HttpException {
  messages: any;

  constructor(response: any) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
