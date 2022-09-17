import { HttpException, Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { UsersRepo } from './dao/users.repository';
import { CreateUserDto } from './interface/dto/create-user.dto';
import { UserInfo } from './interface/UserInfo';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async isUserExists(email: string) {
    const user = await this.usersRepo.selectWhereEmail(email);
    // 0이외의 숫자타입, '' 이외의 문자열 타입, 배열 타입, 객체 타입은 true
    return user ? true : false;
  }

  async readUser(id: number) {
    return await this.usersRepo.selectWhereId(id);
  }

  async createUser(email: string, pw: string, name: string) {
    const isUserExist = await this.isUserExists(email);
    if (isUserExist) {
      throw new HttpException('해당 이메일은 이미 존재합니다.', 400);
    }
    const signupVerifyToken = 'testtoken';
    return await this.usersRepo.insert({
      email,
      password: pw,
      name,
      signupVerifyToken,
    });
  }

  /*
  async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return await this.usersRepo.saveUser({
      name,
      email,
      password,
      signupVerifyToken,
    });
  }
*/
  async getUserInfo(userId: string): Promise<UserInfo> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not implemented.');
  }
}
