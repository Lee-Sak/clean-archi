import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { User } from './user';
import { UserCreatedEvent } from './user.created.event';

@Injectable()
// 객체의 생성을 담당하는 클래스를 한 곳으로 분리한 것 = 팩토리패턴
// 팩토리 패턴을 쓰지 않을 경우 어떠한 클래스가 변경될 경우(생성자의 인자가 추가됨)
// 해당 클래스를 사용하는 파일에서의 모두 수정이 이루어저야함
// 팩토리 패턴을 씀으로써 팩토리 안에서만 수정이 이루어지면 된다.
export class UserFactory {
  constructor(private eventBus: EventBus) {}

  create(
    id: number,
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ): User {
    const user = new User(id, name, email, password, signupVerifyToken); // 유저 객체 생성
    this.eventBus.publish(new UserCreatedEvent(email, signupVerifyToken)); // 유저생성 이벤트 발행
    return user; // 생성한 유저 도메인 객체를 리턴
  }

  reconstitute(
    id: number,
    name: string,
    email: string,
    signupVerifyToken: string,
    password: string,
  ) {
    const user = new User(id, name, email, password, signupVerifyToken); // 유저 객체 생성
    return user;
  }
}
