import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comments' })
export class Comments {

    @PrimaryGeneratedColumn('uuid')
    comment_id: string

    @Column()
    description: string
}