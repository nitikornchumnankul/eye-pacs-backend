import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosRepository } from './eye-photos/eye-photos.repository';
import { Table1Repository } from './table-1/table-1.repository';
import { Table1Service } from './table-1/table-1.service';
import { Table10Repository } from './table-10/table-10.repository';
import { Table10Service } from './table-10/table-10.service';
import { Table11Repository } from './table-11/table-11.repository';
import { Table11Service } from './table-11/table-11.service';
import { Table12Repository } from './table-12/table-12.repository';
import { Table12Service } from './table-12/table-12.service';
import { Table13Repository } from './table-13/table-13.repository';
import { Table13Service } from './table-13/table-13.service';
import { Table2Repository } from './table-2/table-2.repository';
import { Table2Service } from './table-2/table-2.service';
import { Table3Repository } from './table-3/table-3.repository';
import { Table3Service } from './table-3/table-3.service';
import { Table4Repository } from './table-4/table-4.repository';
import { Table4Service } from './table-4/table-4.service';
import { Table5Repository } from './table-5/table-5.repository';
import { Table5Service } from './table-5/table-5.service';
import { Table6Repository } from './table-6/table-6.repository';
import { Table6Service } from './table-6/table-6.service';
import { Table7Repository } from './table-7/table-7.repository';
import { Table7Service } from './table-7/table-7.service';
import { Table8Repository } from './table-8/table-8.repository';
import { Table8Service } from './table-8/table-8.service';
import { Table9Repository } from './table-9/table-9.repository';
import { Table9Service } from './table-9/table-9.service';
import { Eye } from './users/table-interface';
import * as fs from 'fs'
import { ConfigService } from '@nestjs/config';
import * as json2csv from 'json2csv'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(EyePhotosRepository)
    private eyePhotosRepository: EyePhotosRepository,

    @InjectRepository(Table1Repository)
    private table1Repository: Table1Repository,

    @InjectRepository(Table2Repository)
    private table2Repository: Table2Repository,

    @InjectRepository(Table3Repository)
    private table3Repository: Table3Repository,

    @InjectRepository(Table4Repository)
    private table4Repository: Table4Repository,

    @InjectRepository(Table5Repository)
    private table5Repository: Table5Repository,

    @InjectRepository(Table6Repository)
    private table6Repository: Table6Repository,

    @InjectRepository(Table7Repository)
    private table7Repository: Table7Repository,

    @InjectRepository(Table8Repository)
    private table8Repository: Table8Repository,

    @InjectRepository(Table9Repository)
    private table9Repository: Table9Repository,

    @InjectRepository(Table10Repository)
    private table10Repository: Table10Repository,

    @InjectRepository(Table11Repository)
    private table11Repository: Table11Repository,

    @InjectRepository(Table12Repository)
    private table12Repository: Table12Repository,

    @InjectRepository(Table13Repository)
    private table13Repository: Table13Repository,

    private table1Service: Table1Service,
    private table2Service: Table2Service,
    private table3Service: Table3Service,
    private table4Service: Table4Service,
    private table5Service: Table5Service,
    private table6Service: Table6Service,
    private table7Service: Table7Service,
    private table8Service: Table8Service,
    private table9Service: Table9Service,
    private table10Service: Table10Service,
    private table11Service: Table11Service,
    private table12Service: Table12Service,
    private table13Service: Table13Service,

    private configService: ConfigService,
  ) {}

  async deleteAllTable(eye_photo_id: string): Promise<string> {
    try {
      await this.table1Service.deleteTable(eye_photo_id)
      await this.table2Service.deleteTable(eye_photo_id)
      await this.table3Service.deleteTable(eye_photo_id)
      await this.table4Service.deleteTable(eye_photo_id)
      await this.table5Service.deleteTable(eye_photo_id)
      await this.table6Service.deleteTable(eye_photo_id)
      await this.table7Service.deleteTable(eye_photo_id)
      await this.table8Service.deleteTable(eye_photo_id)
      await this.table9Service.deleteTable(eye_photo_id)
      await this.table10Service.deleteTable(eye_photo_id)
      await this.table11Service.deleteTable(eye_photo_id)
      await this.table12Service.deleteTable(eye_photo_id)
      await this.table13Service.deleteTable(eye_photo_id)
      return "success"
    } catch(e) {
      throw new BadRequestException()
    }
  }

  async exportToCSV(): Promise<any> {
    try {
      // Eye
      const eyes_query = this.eyePhotosRepository.createQueryBuilder('eye_photos')
      const eyes = await eyes_query.getMany()

      // Table 1
      const table_1_query = this.table1Repository.createQueryBuilder('table_1')
        .leftJoinAndSelect('table_1.eye_photo', 'eye_photo')
      const table_1 = await table_1_query.getMany()

      // Table 2
      const table_2_query = this.table2Repository.createQueryBuilder('table_2')
        .leftJoinAndSelect('table_2.eye_photo', 'eye_photo')
      const table_2 = await table_2_query.getMany()

      // Table 1
      const table_3_query = this.table3Repository.createQueryBuilder('table_3')
        .leftJoinAndSelect('table_3.eye_photo', 'eye_photo')
      const table_3 = await table_3_query.getMany()

      // Table 4
      const table_4_query = this.table4Repository.createQueryBuilder('table_4')
        .leftJoinAndSelect('table_4.eye_photo', 'eye_photo')
      const table_4 = await table_4_query.getMany()

      // Table 5
      const table_5_query = this.table5Repository.createQueryBuilder('table_5')
        .leftJoinAndSelect('table_5.eye_photo', 'eye_photo')
      const table_5 = await table_5_query.getMany()

      // Table 6
      const table_6_query = this.table6Repository.createQueryBuilder('table_6')
        .leftJoinAndSelect('table_6.eye_photo', 'eye_photo')
      const table_6 = await table_6_query.getMany()

      // Table 7
      const table_7_query = this.table7Repository.createQueryBuilder('table_7')
        .leftJoinAndSelect('table_7.eye_photo', 'eye_photo')
      const table_7 = await table_7_query.getMany()

      // Table 8
      const table_8_query = this.table8Repository.createQueryBuilder('table_8')
        .leftJoinAndSelect('table_8.eye_photo', 'eye_photo')
      const table_8 = await table_8_query.getMany()

      // Table 9
      const table_9_query = this.table9Repository.createQueryBuilder('table_9')
        .leftJoinAndSelect('table_9.eye_photo', 'eye_photo')
      const table_9 = await table_9_query.getMany()

      // Table 10
      const table_10_query = this.table10Repository.createQueryBuilder('table_10')
        .leftJoinAndSelect('table_10.eye_photo', 'eye_photo')
      const table_10 = await table_10_query.getMany()

      // Table 11
      const table_11_query = this.table11Repository.createQueryBuilder('table_11')
        .leftJoinAndSelect('table_11.eye_photo', 'eye_photo')
      const table_11 = await table_11_query.getMany()

      // Table 12
      const table_12_query = this.table12Repository.createQueryBuilder('table_12')
        .leftJoinAndSelect('table_12.eye_photo', 'eye_photo')
      const table_12 = await table_12_query.getMany()

      // Table 13
      const table_13_query = this.table13Repository.createQueryBuilder('table_13')
        .leftJoinAndSelect('table_13.eye_photo', 'eye_photo')
      const table_13 = await table_13_query.getMany()
      
      const export_path = this.configService.get('EXPORT_PATH')
      let output: Eye[] = []
      for(let i=0; i<table_1.length; i++) {
        output.push(
          {
            image_name: eyes[i].eye_photo_id,

            yes_1: table_1[i].yes,
            cannot_grade_1: table_1[i].cannot_grade,

            yes_2: table_2[i].yes,
            cannot_grade_2: table_2[i].cannot_grade,

            yes_3: table_3[i].yes,
            cannot_grade_3: table_3[i].cannot_grade,

            lower_2a: table_4[i].lower_2a,
            upper_2a: table_4[i].upper_2a,
            cannot_grade_2a: table_4[i].cannot_grade,

            yes_5: table_5[i].yes,
            cannot_grade_5: table_5[i].cannot_grade,

            lower_8a: table_6[i].lower_8a,
            upper_8a: table_6[i].upper_8a,
            cannot_grade_8a: table_6[i].cannot_grade,

            yes_7: table_7[i].yes,
            cannot_grade_7: table_7[i].cannot_grade,

            yes_8: table_8[i].yes,
            cannot_grade_8: table_8[i].cannot_grade,

            yes_9: table_9[i].yes,
            cannot_grade_9: table_9[i].cannot_grade,

            yes_10: table_10[i].yes,
            cannot_grade_10: table_10[i].cannot_grade,

            yes_11: table_11[i].yes,
            cannot_grade_11: table_11[i].cannot_grade,

            lower_2DD: table_12[i].lower_2DD,
            lower_1DD: table_12[i].lower_1DD,
            cannot_grade_DD: table_12[i].cannot_grade,

            cataract: table_13[i].cataract,
            glaucoma: table_13[i].glaucoma,
            occlusion: table_13[i].occlusion,
            maculopathy: table_13[i].maculopathy,
            other: table_13[i].other,
          }
        )
      }

      let record = new Date()
      const json2csvParser = new json2csv.Parser()
      const csv = json2csvParser.parse(output)
      fs.writeFileSync(`${export_path}/${record.toISOString().split('T')[0]}_eye_data.csv`, csv)
      return `${record.toISOString().split('T')[0]}_eye_data.csv`
    } catch(e) {
      throw new BadRequestException({
        message: 'Error, cant\'t export file.'
      })
    }
  }
}
