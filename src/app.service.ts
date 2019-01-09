import { Injectable } from '@nestjs/common';
import { ArticleDTO } from './article.dto';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  storeArticle(articleDTO: ArticleDTO): Promise<Article> {
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
