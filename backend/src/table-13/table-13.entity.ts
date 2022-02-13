import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table_13' })
export class Table13 {

    @PrimaryGeneratedColumn('uuid')
    table_13_id: string

    @Column({ type: 'integer', default: 0 })
    cataract: number

    @Column({ type: 'integer', default: 0 })
    glaucoma: number

    @Column({ type: 'integer', default: 0 })
    occlusion: number

    @Column({ type: 'integer', default: 0 })
    maculopathy: number

    @Column({ type: 'integer', default: 0 })
    other: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}