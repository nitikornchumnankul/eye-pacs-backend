// Panretinal laser scars present

import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table-10' })
export class Table10 {

    @PrimaryGeneratedColumn('uuid')
    table_10_id: string

    @Column({ type: 'integer', default: 0 })
    yes: number
    
    @Column({ type: 'integer', default: 0 })
    cannot_grade: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}