import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertUserDto } from '../interface/dto/insert-user.dto';
import { UserEntity } from '../infra/db/entity/user.entity';

@Injectable()
export class UsersRepo {
  constructor(
    @InjectRepository(UserEntity)
    private user: Repository<UserEntity>,
  ) {}

  async insert(dto: InsertUserDto) {
    return await this.user.insert(dto);
  }

  async selectWhereId(id: number) {
    return await this.user.findOneBy({ id });
  }

  async selectWhereEmail(email: string) {
    return await this.user.findOneBy({ email });
  }
}
