import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CQRSModule } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleHandler } from './commands/handlers/create-article.handlers';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'arthurlevoyer',
      password: '',
      database: 'croutedb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Article]),
    CQRSModule,
  ],
  controllers: [AppController],
  providers: [AppService, CreateArticleHandler],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly commandBus$: CommandBus, private readonly moduleRef: ModuleRef) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register([CreateArticleHandler]);
  }
}
