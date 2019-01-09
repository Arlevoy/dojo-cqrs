import { Controller, Get, Body, Post } from '@nestjs/common';
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
  getArticles(): ArticleDTO[] {
    return [
      {
        name: 'Mon title',
        content: 'Croute',
      },
    ];
  }

  @Post('articles')
  createArticle(@Body() createArticleDto: ArticleDTO): Promise<ArticleDTO> {
    return this.appService.storeArticle(createArticleDto);
  }
}
