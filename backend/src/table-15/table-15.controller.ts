import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Table15Dto } from './dto/table-15.dto';
import { UpdateTable15Dto } from './dto/update-table-15.dto';
import { Table15 } from './table-15.entity';
import { Table15Service } from './table-15.service';

@Controller('table-15')
export class Table15Controller {
    constructor(private table14Service: Table15Service) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() table15Dto: Table15Dto,
    ): Promise<Table15> {
        return this.table14Service.createTable(eye_photo_id, table15Dto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateTable(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateTable15Dto: UpdateTable15Dto,
    ): Promise<Table15> {
        return this.table14Service.updateTable(eye_photo_id, updateTable15Dto)
    }

    @Get(':eye_photo_id/get')
    getTable(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<Table15> {
        return this.table14Service.getTable(eye_photo_id)
    }
}
