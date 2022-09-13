import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserInfo } from 'src/users/interface/UserInfo';
import { UsersRepo } from '../../dao/users.repository';
import { GetUserInfoQuery } from './get.user.info.query';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoQueryHandler
  implements IQueryHandler<GetUserInfoQuery>
{
  constructor(private readonly usersRepo: UsersRepo) {}

  async execute(query: GetUserInfoQuery): Promise<UserInfo> {
    const { userId } = query;

    const user = await this.usersRepo.selectWhereId(userId);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
