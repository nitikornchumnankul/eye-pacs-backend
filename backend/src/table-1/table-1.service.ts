import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableDto } from '../table-dto/create-table.dto';
import { UpdateTableDto } from '../table-dto/update-table.dto';
import { Table1 } from './table-1.entity';
import { Table1Repository } from './table-1.repository';

@Injectable()
export class Table1Service {
    constructor(
        @InjectRepository(Table1Repository)
        private table1Repository: Table1Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableDto: CreateTableDto): Promise<Table1> {
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

            const table = this.table1Repository.create({ ...obj, eye_photo: photo })
            return await this.table1Repository.save(table)
        } catch(e) {
            throw new BadRequestException({ message: 'Error, Can\'t create table.' })
        }
    }

    async updateTable(eye_photo_id: string, updateTableDto: UpdateTableDto): Promise<Table1> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table1Repository.findOne({ where: { eye_photo } })
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

            return await this.table1Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }
}
