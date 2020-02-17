import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Info {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    info_id: number;

    @Column({type: "char", length: 100})
    info_from_id: string;

    @Column({type: "char", length: 100})
    info_to_id: string;

    @Column({type: "int", width: 1})
    info_type: number;

    @Column({type: "char", length: 255})
    info_content: string;

    @Column({type: "char", length: 50})
    info_content_type: string;

    @Column({type: "datetime"})
    info_created_time: string;

    @Column({type: "int", width: 1})
    info_state: number;
}