import { EyeSide } from "src/enum/eyeside.enum";
import { Status } from "src/enum/status.enum";
import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity({ name: 'eye_photos' })
export class EyePhotos {

    @PrimaryColumn()
    eye_photo_id: string

    @Column()
    path: string

    @Column({ nullable: true })
    eyeside: EyeSide

    @Column({ default: Status.inPorgress })
    status: Status

    @CreateDateColumn()
    created: Date
}