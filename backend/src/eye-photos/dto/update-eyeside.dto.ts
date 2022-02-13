import { IsEnum, IsNotEmpty } from "class-validator";
import { EyeSide } from "src/enum/eyeside.enum";

export class UpdateEyeSideDto {

    @IsNotEmpty()
    @IsEnum(EyeSide)
    eyeside: EyeSide
}