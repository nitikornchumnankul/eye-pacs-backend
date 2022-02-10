import { IsOptional } from "class-validator";

export class SearchEyePhotosDto {

    @IsOptional()
    name?: string
}