import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsRepository,
    ])
  ],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
