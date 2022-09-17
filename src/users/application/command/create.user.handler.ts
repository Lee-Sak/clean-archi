import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create.user.command';
import { UserFactory } from 'src/users/domain/user.factory';
import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { IUserRepository } from 'src/users/domain/repository/iuser.repository';
import { UserCreatedEvent } from 'src/users/domain/user.created.event';

@Injectable()
@CommandHandler(CreateUserCommand)
// CreateUserCommand를 처리하기 위한 핸들러
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userFactory: UserFactory,
    @Inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    const { name, email, password } = command;

    const isUserExist = await this.userRepository.findByEmail(email);
    if (isUserExist) {
      throw new HttpException('해당 이메일은 이미 존재합니다.', 400);
    }

    const id = null;
    const signupVerifyToken = uuid.v1();
    await this.userRepository.save(
      Number(id),
      name,
      email,
      password,
      signupVerifyToken,
    );

    return this.userFactory.create(
      Number(id),
      name,
      email,
      password,
      signupVerifyToken,
    );
  }
}
