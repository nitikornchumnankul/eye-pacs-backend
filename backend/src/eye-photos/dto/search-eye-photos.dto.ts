import { IsEnum, IsOptional } from "class-validator";
import { Sort } from "../enums/sort.enum";

export class SearchEyePhotosDto {

    @IsOptional()
    name?: string

    @IsOptional()
    @IsEnum(Sort)
    status?: Sort

    @IsOptional()
    @IsEnum(Sort)
    date?: Sort
}