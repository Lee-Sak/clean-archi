import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { User } from './user';
import { UserCreatedEvent } from './user.created.event';

@Injectable()
// 팩토리 패턴은 객체를 생성하는 인터페이스는 미리 정의하되, 인스턴스를 만들 클래스의 결정은 서브 클래스 쪽에서 내리는 패턴입니다
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
