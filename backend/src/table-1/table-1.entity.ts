// No apparent diabetic retinopathy

import { EyeSide } from "src/enum/eyeside.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'table_1' })
export class Table1 {

    @PrimaryGeneratedColumn('uuid')
    table_1_id: string

    @Column()
    eyeside: EyeSide

    @Column({ type: 'integer', default: 0 })
    yes: number
    
    @Column({ type: 'integer', default: 0 })
    cannot_grade: number
}