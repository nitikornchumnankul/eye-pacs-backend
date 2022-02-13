import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { CreateTableDto } from './dto/create-table.dto';
import { Table1 } from './table-1.entity';
import { Table1Repository } from './table-1.repository';

@Injectable()
export class Table1Service {
    constructor(
        @InjectRepository(Table1Repository)
        private table1Repository: Table1Repository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createTable(createTableDto: CreateTableDto, eye_photo_id: string): Promise<Table1> {
        try {
            const photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { yes, cannot_grade } = createTableDto
            let obj: object

            if(yes) {
                obj = { ...obj, yes: 1 }
            } else if(cannot_grade && !yes) {
                obj = { ...obj, cannot_grade: 1 }
            }

            const table = this.table1Repository.create({ ...obj, eye_photo: photo })
            return await this.table1Repository.save(table)
        } catch(e) {
            throw new BadRequestException({ message: 'Error, cant\' create table' })
        }
    }
}
