// Intraetinal microvascular abnormalities (IRMA) 8a

import { EyePhotos } from "src/eye-photos/eye-photos.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table_6' })
export class Table6 {

    @PrimaryGeneratedColumn('uuid')
    table_6_id: string

    // <8a
    @Column({ type: 'integer', default: 0 })
    lower_8a: number
    
    // >8a
    @Column({ type: 'integer', default: 0 })
    upper_8a: number
    
    @Column({ type: 'integer', default: 0 })
    cannot_grade: number

    @OneToOne(() => EyePhotos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'eye_photo_id' })
    eye_photo: EyePhotos
}