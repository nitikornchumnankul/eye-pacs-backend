// New vessels (NV) or Fibrous Proliferation (FP)

import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table-7' })
export class Table7 {

    @PrimaryGeneratedColumn('uuid')
    table_7_id: string

    @Column({ type: 'integer', default: 0 })
    yes: number
    
    @Column({ type: 'integer', default: 0 })
    cannot_grade: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}