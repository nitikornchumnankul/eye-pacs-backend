import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsRepository,
    ])
  ],
  providers: [CommentsService],
  exports: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
