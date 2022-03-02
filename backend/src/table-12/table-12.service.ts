import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableHeDto } from 'src/table-dto/create-table-he.dto';
import { UpdateTableHeDto } from 'src/table-dto/update-table-he.dto';
import { Table12 } from './table-12.entity';
import { Table12Repository } from './table-12.repository';

@Injectable()
export class Table12Service {
    constructor(
        @InjectRepository(Table12Repository)
        private table12Repository: Table12Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableHeDto: CreateTableHeDto): Promise<Table12> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { lower_2DD, lower_1DD, cannot_grade } = createTableHeDto
            let obj: object

            if(lower_2DD) {
                obj = { ...obj, lower_2DD: 1 }
            } else if(lower_1DD) {
                obj = { ...obj, lower_1DD: 1 }
            } else if(cannot_grade) {
                obj = { ...obj, cannot_grade: 1 }
            } else {
                throw new BadRequestException()
            }

            const table = this.table12Repository.create({ ...obj, eye_photo: photo })
            return await this.table12Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async getTable(eye_photo_id: string): Promise<Table12> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            return await this.table12Repository.findOne({ where: { eye_photo } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateTable(eye_photo_id: string, updateTableHeDto: UpdateTableHeDto): Promise<Table12> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table12Repository.findOne({ where: { eye_photo } })
            const { lower_2DD, lower_1DD, cannot_grade } = updateTableHeDto

            if(lower_2DD) {
                table.lower_2DD = 1
                table.lower_1DD = 0
                table.cannot_grade = 0

            } else if(lower_1DD) {
                table.lower_2DD = 0
                table.lower_1DD = 1
                table.cannot_grade = 0

            } else if(cannot_grade) {
                table.lower_2DD = 0
                table.lower_1DD = 0
                table.cannot_grade = 1
            } else {
                throw new BadRequestException()
            }

            return await this.table12Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table12Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table12Repository.delete(table.table_12_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
