import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailService } from 'src/email/email.service';
import { UserCreatedEvent } from 'src/users/domain/user.created.event';
import { GmailService } from 'src/users/infra/adapter/gmail.service';
import { IEmailService } from '../adapter/iemail.service';
import { TestEvent } from './test.event';

@EventsHandler(UserCreatedEvent, TestEvent)
export class UserEventsHandler
  implements IEventHandler<UserCreatedEvent | TestEvent>
{
  constructor(@Inject('EmailService') private emailService: IEmailService) {}

  async handle(event: UserCreatedEvent | TestEvent) {
    switch (event.name) {
      case UserCreatedEvent.name: {
        console.log('UserCreatedEvent!');
        const { email, signupVerifyToken } = event as UserCreatedEvent;
        console.log(email, signupVerifyToken);
        //const gmailSer:IEmailService = new GmailService(new EmailService(aa));
        //const navermailSer:IEmailService = new NaverService(new EmailService(aa));
        // 다른 메일 서비스를 사용하고 싶을 때
        // 이 부분은 바뀌지 않는다. 인터페이스 설계를 통해 함수와 인자가 고정되어 있고
        // DI를 통해 객체를 생성하는 코드의 수정이 필요 없고,
        // 주입하는 메일서비스(클래스)만 바꿔주면 된다.
        await this.emailService.sendMemberJoinVerification(
          email,
          signupVerifyToken,
        );
        // 만약 클래스를 직접 주입 받아 사용하면 생성자에서 주입하는 클래스명을 바꿔야하고
        // 주입받은 클래스의 함수에 맞게 변형해야한다.
        break;
      }
      case TestEvent.name: {
        console.log('TestEvent!');
        break;
      }
      default:
        break;
    }
  }
}
