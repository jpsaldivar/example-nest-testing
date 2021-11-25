import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CatsService } from './services/cats.service';
import { catsProviders } from './providers/cat.providers';
import { CatsController } from './controller/cats.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
})
export class CatsModule {}
