import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableHmaDto } from 'src/table-dto/create-table-hma.dto';
import { UpdateTableHmaDto } from 'src/table-dto/update-table-hma.dto';
import { Table4 } from './table-4.entity';
import { Table4Repository } from './table-4.repository';

@Injectable()
export class Table4Service {
    constructor(
        @InjectRepository(Table4Repository)
        private table4Repository: Table4Repository,
        private eyePhotosService: EyePhotosService
    ) {}

    async createTable(eye_photo_id: string, createTableHmaDto: CreateTableHmaDto): Promise<Table4> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { lower_2a, upper_2a, cannot_grade } = createTableHmaDto
            let obj: object

            if(lower_2a) {
                obj = { ...obj, lower_2a: 1 }
            } else if(upper_2a) {
                obj = { ...obj, upper_2a: 1 }
            } else if(cannot_grade) {
                obj = { ...obj, cannot_grade: 1 }
            } else {
                throw new BadRequestException()
            }

            const table = this.table4Repository.create({ ...obj, eye_photo: photo })
            return await this.table4Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async updateTable(eye_photo_id: string, updateTableHmaDto: UpdateTableHmaDto): Promise<Table4> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table4Repository.findOne({ where: { eye_photo } })
            const { lower_2a, upper_2a, cannot_grade } = updateTableHmaDto

            if(lower_2a) {
                table.lower_2a = 1
                table.upper_2a = 0
                table.cannot_grade = 0

            } else if(upper_2a) {
                table.lower_2a = 0
                table.upper_2a = 1
                table.cannot_grade = 0

            } else if(cannot_grade) {
                table.lower_2a = 0
                table.upper_2a = 0
                table.cannot_grade = 1
            } else {
                throw new BadRequestException()
            }

            return await this.table4Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table4Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table4Repository.delete(table.table_4_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
