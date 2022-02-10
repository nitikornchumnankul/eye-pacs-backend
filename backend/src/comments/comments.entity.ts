import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'comments' })
export class Comments {

    @PrimaryColumn('uuid')
    comment_id: string

    @Column()
    description: string
}