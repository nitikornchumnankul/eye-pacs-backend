import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTableDto } from './dto/create-table.dto';
import { Table1 } from './table-1.entity';
import { Table1Service } from './table-1.service';

@Controller('table-1')
export class Table1Controller {
    constructor(private table1Service: Table1Service) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createTable(
        @Body() createTableDto: CreateTableDto
    ): Promise<Table1> {
        return this.table1Service.createTable(createTableDto)
    }
}
