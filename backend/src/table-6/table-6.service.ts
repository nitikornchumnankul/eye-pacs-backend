import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableIrmaDto } from 'src/table-dto/create-table-irma.dto';
import { UpdateTableIrmaDto } from 'src/table-dto/update-table-irma.dto';
import { Table6 } from './table-6.entity';
import { Table6Repository } from './table-6.repository';

@Injectable()
export class Table6Service {
    constructor(
        @InjectRepository(Table6Repository)
        private table6Repository: Table6Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableIrmaDto: CreateTableIrmaDto): Promise<Table6> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { lower_8a, upper_8a, cannot_grade } = createTableIrmaDto
            let obj: object

            if(lower_8a) {
                obj = { ...obj, lower_8a: 1 }
            } else if(upper_8a) {
                obj = { ...obj, upper_8a: 1 }
            } else if(cannot_grade) {
                obj = { ...obj, cannot_grade: 1 }
            } else {
                throw new BadRequestException()
            }

            const table = this.table6Repository.create({ ...obj, eye_photo: photo })
            return await this.table6Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async updateTable(eye_photo_id: string, updateTableIrmaDto: UpdateTableIrmaDto): Promise<Table6> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table6Repository.findOne({ where: { eye_photo } })
            const { lower_8a, upper_8a, cannot_grade } = updateTableIrmaDto

            if(lower_8a) {
                table.lower_8a = 1
                table.upper_8a = 0
                table.cannot_grade = 0

            } else if(upper_8a) {
                table.lower_8a = 0
                table.upper_8a = 1
                table.cannot_grade = 0

            } else if(cannot_grade) {
                table.lower_8a = 0
                table.upper_8a = 0
                table.cannot_grade = 1
            } else {
                throw new BadRequestException()
            }

            return await this.table6Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table6Repository.findOne({ where: { eye_photo } })
            await this.table6Repository.delete(table.table_6_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
