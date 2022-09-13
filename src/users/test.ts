import { Injectable } from '@nestjs/common';

export interface Person {
  surname?: string;
  readonly getName: () => string;
  getAge?: () => number;
  getHeight?(): string;
}

@Injectable()
export class Dexter implements Person {
  getName() {
    return 'dexter';
  }
}

@Injectable()
export class Jane implements Person {
  getName() {
    return 'jane';
  }
  getAge = () => 5;
}
