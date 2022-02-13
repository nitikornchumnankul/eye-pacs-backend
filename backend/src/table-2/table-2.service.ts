import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableDto } from 'src/table-dto/create-table.dto';
import { UpdateTableDto } from 'src/table-dto/update-table.dto';
import { Table2 } from './table-2.entity';
import { Table2Repository } from './table-2.repository';

@Injectable()
export class Table2Service {
    constructor(
        @InjectRepository(Table2Repository)
        private table2Repository: Table2Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(createTableDto: CreateTableDto, eye_photo_id: string): Promise<Table2> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { yes, cannot_grade } = createTableDto
            let obj: object

            if(yes) {
                obj = { ...obj, yes: 1 }
            } else if(cannot_grade && !yes) {
                obj = { ...obj, cannot_grade: 1 }
            }

            const table = this.table2Repository.create({ ...obj, eye_photo: photo })
            return await this.table2Repository.save(table)
        } catch(e) {
            throw new BadRequestException({ message: 'Error, Can\'t create table.' })
        }
    }

    async getTableById(table_1_id: string): Promise<Table2> {
        try {
            const table = await this.table2Repository.findOne(table_1_id)
            return table
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table not found.'
            })
        }
    }

    async updateTable(eye_photo_id: string, updateTableDto: UpdateTableDto): Promise<Table2> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table2Repository.findOne({ where: { eye_photo } })
            const { yes, cannot_grade } = updateTableDto

            if(yes) {
                table.yes = 1
                table.cannot_grade = 0
            } else if(cannot_grade && !yes) {
                table.cannot_grade = 1
                table.yes = 0
            }

            return await this.table2Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table not found.'
            })
        }
    }
}
