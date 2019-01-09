import { IEvent } from '@nestjs/cqrs';

export class ArticleCreated implements IEvent {
  aggregateId: string;
  name: string;
  content: string;

  constructor(payload: { aggregateId: string; name: string; content: string }) {
    payload.aggregateId = this.aggregateId;
    payload.name = this.name;
    payload.content = this.content;
  }
}
