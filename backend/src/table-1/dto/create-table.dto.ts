import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { EyeSide } from "src/enum/eyeside.enum";

export class CreateTableDto {

    @IsNotEmpty()
    @IsEnum(EyeSide)
    eyeside: EyeSide

    @IsOptional()
    yes?: boolean

    @IsOptional()
    cannot_grade?: boolean
}