import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './interface/users.controller';
import { EmailService } from 'src/email/email.service';
import { Dexter, Jane } from './test';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infra/db/entity/user.entity';
import { UsersRepo } from './dao/users.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/command/create.user.handler';
import { UserEventsHandler } from './application/event/user.event.handler';
import { GetUserInfoQueryHandler } from './application/query/get.user.info.query.handler';
import { UserRepository } from './infra/db/repository/UserRepository';
import { UserFactory } from './domain/user.factory';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    EmailService,
    UsersRepo,
    {
      provide: 'Person',
      useClass: Jane,
    },
    CreateUserHandler,
    UserEventsHandler,
    GetUserInfoQueryHandler,
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'EmailService', useClass: EmailService },
    UserFactory,
  ],
})
export class UsersModule {}
