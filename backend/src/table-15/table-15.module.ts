import { Module } from '@nestjs/common';
import { Table15Service } from './table-15.service';
import { Table15Controller } from './table-15.controller';
import { EyePhotosModule } from 'src/eye-photos/eye-photos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table15Reposotory } from './table15.repository';

@Module({
  imports:[ EyePhotosModule,TypeOrmModule.forFeature([
    Table15Reposotory
  ])],
  controllers: [Table15Controller],
  providers: [Table15Service],
  exports:[Table15Service]
})
export class Table15Module {}
