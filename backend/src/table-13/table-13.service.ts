import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableOtherDto } from 'src/table-dto/create-table-other.dto';
import { UpdateTableOtherDto } from 'src/table-dto/update-table-other.dto';
import { Table13 } from './table-13.entity';
import { Table13Repository } from './table-13.repository';

@Injectable()
export class Table13Service {
    constructor(
        @InjectRepository(Table13Repository)
        private table13Repository: Table13Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, createTableOtherDto: CreateTableOtherDto): Promise<Table13> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const {
                cataract,
                glaucoma,
                occlusion,
                maculopathy,
                other,
            } = createTableOtherDto
            let obj: object

            if(cataract) {
                obj = { ...obj, cataract: 1 }
            } else if(glaucoma) {
                obj = { ...obj, glaucoma: 2 }
            } else if(occlusion) {
                obj = { ...obj, occlusion: 3 }
            } else if(maculopathy) {
                obj = { ...obj, maculopathy: 4 }
            } else if(other) {
                obj = { ...obj, other: 5 }
            } else {
                throw new BadRequestException()
            }

            const table = this.table13Repository.create({ ...obj, eye_photo: photo })
            return await this.table13Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async updateTable(eye_photo_id: string, updateTableOtherDto: UpdateTableOtherDto): Promise<Table13> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table13Repository.findOne({ where: { eye_photo } })
            const {
                cataract,
                glaucoma,
                occlusion,
                maculopathy,
                other,
            } = updateTableOtherDto

            if(cataract) {
                table.cataract = 1
                table.glaucoma = 0
                table.occlusion = 0
                table.maculopathy = 0
                table.other = 0

            } else if(glaucoma) {
                table.cataract = 0
                table.glaucoma = 2
                table.occlusion = 0
                table.maculopathy = 0
                table.other = 0

            } else if(occlusion) {
                table.cataract = 0
                table.glaucoma = 0
                table.occlusion = 3
                table.maculopathy = 0
                table.other = 0

            } else if(maculopathy) {
                table.cataract = 0
                table.glaucoma = 0
                table.occlusion = 0
                table.maculopathy = 4
                table.other = 0

            } else if(other) {
                table.cataract = 0
                table.glaucoma = 0
                table.occlusion = 0
                table.maculopathy = 0
                table.other = 5

            } else {
                throw new BadRequestException()
            }

            return await this.table13Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table13Repository.findOne({ where: { eye_photo } })
            await this.table13Repository.delete(table.table_13_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
