// HE close to center of macula

import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table_12' })
export class Table12 {

    @PrimaryGeneratedColumn('uuid')
    table_12_id: string

    // <2DD
    @Column({ type: 'integer', default: 0 })
    lower_2DD: number
    
    // <1DD
    @Column({ type: 'integer', default: 0 })
    lower_1DD: number
    
    @Column({ type: 'integer', default: 0 })
    cannot_grade: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}