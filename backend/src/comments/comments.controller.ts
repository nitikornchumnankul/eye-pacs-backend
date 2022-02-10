import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createComment(
        @Body() createCommentDto: CreateCommentDto
    ): Promise<Comments> {
        return this.commentsService.createComment(createCommentDto)
    }

    @Get(':comment_id')
    getCommentById(
        @Param('comment_id') comment_id: string
    ): Promise<Comments> {
        return this.commentsService.getCommentById(comment_id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':comment_id/update')
    updateComment(
        @Param('comment_id') comment_id: string,
        @Body() editCommentDto: EditCommentDto,
    ): Promise<Comments> {
        return this.commentsService.updateComment(comment_id, editCommentDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':comment_id/delete')
    deleteComment(
        @Param('comment_id') comment_id: string
    ): Promise<Comments> {
        return this.commentsService.deleteComment(comment_id)
    }
}
