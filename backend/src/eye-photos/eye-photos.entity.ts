import { EyeSide } from "src/enum/eyeside.enum";
import { Status } from "src/enum/status.enum";
import { Table1 } from "src/table-1/table-1.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

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

    @OneToOne(() => Table1)
    @JoinColumn({ name: 'table_1_id' })
    table_1: Table1
}