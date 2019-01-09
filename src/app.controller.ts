import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDTO } from './article.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/articles')
  getArticles(): Promise<ArticleDTO[]> {
    return this.appService.getAllArticles();
  }

  @Get('/articles/:id')
  getArticle(@Param() params): Promise<ArticleDTO> {
    return this.appService.getOneArticle(params.id);
  }

  @Post('articles')
  createArticle(@Body() createArticleDto: ArticleDTO): Promise<ArticleDTO> {
    return this.appService.storeArticle(createArticleDto);
  }
}
