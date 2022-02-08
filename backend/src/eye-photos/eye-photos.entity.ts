import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'eye_photos' })
export class EyePhotos {

    @PrimaryColumn()
    eye_photo_id: string

    @Column()
    path: string
}