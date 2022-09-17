import { Injectable } from '@nestjs/common';
import { EmailService as ExternalEmailService } from 'src/email/email.service';
import { IEmailService } from 'src/users/application/adapter/iemail.service';

@Injectable()
export class NaverEmailService implements IEmailService {
  constructor(private emailService: ExternalEmailService) {}

  async sendMemberJoinVerification(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    console.log('naver email service!');
    this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
