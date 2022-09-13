import { ICommand } from '@nestjs/cqrs';

// 유저 생성을 위한 커맨드
export class CreateUserCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
