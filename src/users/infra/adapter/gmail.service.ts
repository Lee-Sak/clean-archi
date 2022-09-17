import { Injectable } from '@nestjs/common';
import { EmailService as ExternalEmailService } from 'src/email/email.service';
import { IEmailService } from 'src/users/application/adapter/iemail.service';

@Injectable()
export class GmailService implements IEmailService {
  constructor(private emailService: ExternalEmailService) {}

  async sendMemberJoinVerification(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    console.log('g email service!');
    this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
