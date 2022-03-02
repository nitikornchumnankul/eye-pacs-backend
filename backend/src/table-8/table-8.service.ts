import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableDto } from 'src/table-dto/create-table.dto';
import { UpdateTableDto } from 'src/table-dto/update-table.dto';
import { Table8 } from './table-8.entity';
import { Table8Repository } from './table-8.repository';

@Injectable()
export class Table8Service {
    constructor(
        @InjectRepository(Table8Repository)
        private table8Repository: Table8Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableDto: CreateTableDto): Promise<Table8> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { yes, cannot_grade } = createTableDto
            let obj: object

            if(yes) {
                obj = { ...obj, yes: 1 }
            } else if(cannot_grade) {
                obj = { ...obj, cannot_grade: 1 }
            } else {
                throw new BadRequestException()
            }

            const table = this.table8Repository.create({ ...obj, eye_photo: photo })
            return await this.table8Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async getTable(eye_photo_id: string): Promise<Table8> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            return await this.table8Repository.findOne({ where: { eye_photo } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateTable(eye_photo_id: string, updateTableDto: UpdateTableDto): Promise<Table8> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table8Repository.findOne({ where: { eye_photo } })
            const { yes, cannot_grade } = updateTableDto

            if(yes) {
                table.yes = 1
                table.cannot_grade = 0
            } else if(cannot_grade) {
                table.yes = 0
                table.cannot_grade = 1
            } else {
                throw new BadRequestException()
            }

            return await this.table8Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table8Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table8Repository.delete(table.table_8_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
