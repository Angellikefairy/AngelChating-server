import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Dialog {
    @Column({type:"int", width: 10})
    @PrimaryGeneratedColumn()
    dialog_id: number;

    @Column({type: "char", length: 100})
    dialog_from_id: string;

    @Column({type: "char", length: 100})
    dialog_target_id: string;

    @Column({type: "datetime"})
    dialog_last_time: string;

    @Column({type: "int", width: 10, nullable: true})
    last_message_id: number;
}