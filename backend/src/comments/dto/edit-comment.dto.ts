import { IsNotEmpty } from "class-validator";

export class EditCommentDto {

    @IsNotEmpty()
    description: string
}