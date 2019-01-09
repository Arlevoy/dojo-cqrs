import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/article-created.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/article.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  execute(command: CreateArticleCommand, resolve: (value?) => void) {
    const article = this.articleRepository.create(command.articleDto);
    this.articleRepository.save(article);
    resolve(article);
  }
}
