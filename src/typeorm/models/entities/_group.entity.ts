import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("_group")
export class Group {
    @Column({type: "char", length: 100})
    @PrimaryGeneratedColumn("uuid")
    group_id: string;

    @Column({type: "varchar", length: 50, unique: true})
    group_name: string;

    @Column({type: "char", length: 100})
    group_manager_id: string;

    @Column({type: "char", length: 255})
    group_avatar: string;

    @Column({type: "datetime"})
    group_reg_time: string;

    @Column({type: "int", width: 1})
    group_type: number;
}