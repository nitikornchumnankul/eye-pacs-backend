import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { Table14Dto } from './dto/table14.dto';
import { Table14 } from './table-14.entity';
import { Table14Repository } from './table14.repository';

@Injectable()
export class Table14Service {
    constructor(
        @InjectRepository(Table14Repository)
        private table14Repository: Table14Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(eye_photo_id: string, table14Dto: Table14Dto): Promise<Table14> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const {
                cataract,
                glaucoma,
                occlusion,
                maculopathy,
                other,
            } = table14Dto
            let value: number

            if(cataract) {
                value = 1
            } else if(glaucoma) {
                value = 2
            } else if(occlusion) {
                value = 3
            } else if(maculopathy) {
                value = 4
            } else if(other) {
                value = 0
            } else {
                throw new BadRequestException()
            }

            const table = this.table14Repository.create({ value, eye_photo: photo })
            return await this.table14Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Can\'t create table.'
            })
        }
    }

    async getTable(eye_photo_id: string): Promise<Table14> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            return await this.table14Repository.findOne({ where: { eye_photo } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateTable(eye_photo_id: string, table14Dto: Table14Dto): Promise<Table14> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table14Repository.findOne({ where: { eye_photo } })
            const {
                cataract,
                glaucoma,
                occlusion,
                maculopathy,
                other,
            } = table14Dto

            if(cataract) {
                table.value = 1
            } else if(glaucoma) {
                table.value = 2
            } else if(occlusion) {
                table.value = 3
            } else if(maculopathy) {
                table.value = 4
            } else if(other) {
                table.value = 0
            } else {
                throw new BadRequestException()
            }

            return await this.table14Repository.save(table)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t update.'
            })
        }
    }

    async deleteTable(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const table = await this.table14Repository.findOne({ where: { eye_photo } })
            if(!table) {
                return "success"
            }
            await this.table14Repository.delete(table.table_14_id)
            return "success"
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, Table can\'t delete.'
            })
        }
    }
}
