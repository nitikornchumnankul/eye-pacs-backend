import { BadRequestException, Injectable } from '@nestjs/common';
import { EyePhotosService } from './eye-photos/eye-photos.service';
import { Table1Service } from './table-1/table-1.service';
import { Table10Service } from './table-10/table-10.service';
import { Table11Service } from './table-11/table-11.service';
import { Table12Service } from './table-12/table-12.service';
import { Table13Service } from './table-13/table-13.service';
import { Table2Service } from './table-2/table-2.service';
import { Table3Service } from './table-3/table-3.service';
import { Table4Service } from './table-4/table-4.service';
import { Table5Service } from './table-5/table-5.service';
import { Table6Service } from './table-6/table-6.service';
import { Table7Service } from './table-7/table-7.service';
import { Table8Service } from './table-8/table-8.service';
import { Table9Service } from './table-9/table-9.service';

@Injectable()
export class AppService {
  constructor(
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
    private eyePhotosService: EyePhotosService,
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
}
