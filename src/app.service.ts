import { Injectable } from '@nestjs/common';
import { ArticleDTO } from './article.dto';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/implementations/article-created.command';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly commandBus: CommandBus,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  storeArticle(articleDTO: ArticleDTO): Promise<Article> {
    const createArticleCommand = new CreateArticleCommand(articleDTO);
    this.commandBus.execute(createArticleCommand);

    const article = this.articleRepository.create(articleDTO);
    return this.articleRepository.save(article);
  }
  getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }
  getOneArticle(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }
}
