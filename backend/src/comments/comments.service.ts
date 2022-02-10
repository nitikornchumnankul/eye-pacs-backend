import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsRepository)
        private commentsRepostiory: CommentsRepository
    ) {}

    async createComment(createCommentDto: CreateCommentDto): Promise<Comments> {
        try {
            const { description } = createCommentDto
            const comment = this.commentsRepostiory.create({
                description,
            })
            return await this.commentsRepostiory.save(comment)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, comment can\'t be created.'
            })
        }
    }

    async getCommentById(comment_id: string): Promise<Comments> {
        try {
            const comment = await this.commentsRepostiory.findOne(comment_id)
            return comment
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, comment is not found.'
            })
        }
    }

    async updateComment(comment_id: string, editCommentDto: EditCommentDto): Promise<Comments> {
        try {
            const comment = await this.getCommentById(comment_id)
            const { description } = editCommentDto

            comment.description = description

            return await this.commentsRepostiory.save(comment)
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, comment is not found.'
            })
        }
    }

    async deleteComment(comment_id: string): Promise<Comments> {
        try {
            const comment = await this.getCommentById(comment_id)
            await this.commentsRepostiory.delete(comment_id)
            return comment
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, comment is not found.'
            })
        }
    }
}
