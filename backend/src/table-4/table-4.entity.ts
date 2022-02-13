// Herrmorhaqes with or without MA (HMA) 2a

import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table_4' })
export class Table4 {

    @PrimaryGeneratedColumn('uuid')
    table_4_id: string

    // <2a
    @Column({ type: 'integer', default: 0 })
    lower_2a: number
    
    // >2a
    @Column({ type: 'integer', default: 0 })
    upper_2a: number
    
    @Column({ type: 'integer', default: 0 })
    cannot_grade: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}