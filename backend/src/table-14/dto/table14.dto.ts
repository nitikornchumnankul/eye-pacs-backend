import { IsOptional } from "class-validator"

export class Table14Dto {
    
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