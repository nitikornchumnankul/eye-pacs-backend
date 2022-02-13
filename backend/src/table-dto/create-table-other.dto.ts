import { IsOptional } from "class-validator"

export class CreateTableOtherDto {

    @IsOptional()
    cataract?: number

    @IsOptional()
    glaucoma?: number

    @IsOptional()
    occlusion?: number

    @IsOptional()
    maculopathy?: number

    @IsOptional()
    other?: number
}