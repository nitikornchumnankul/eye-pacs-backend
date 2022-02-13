import { Module } from '@nestjs/common';
import { Table3Controller } from './table-3.controller';
import { Table3Service } from './table-3.service';

@Module({
  controllers: [Table3Controller],
  providers: [Table3Service]
})
export class Table3Module {}
