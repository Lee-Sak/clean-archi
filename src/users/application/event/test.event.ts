import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/users/domain/cqrs.event';

export class TestEvent extends CqrsEvent implements IEvent {
  constructor() {
    super(TestEvent.name);
  }
}
