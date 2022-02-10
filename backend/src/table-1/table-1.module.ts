import { Module } from '@nestjs/common';
import { Table1Service } from './table-1.service';
import { Table1Controller } from './table-1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table1Repository } from './table-1.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Table1Repository,
    ]),
  ],
  providers: [Table1Service],
  controllers: [Table1Controller]
})
export class Table1Module {}
