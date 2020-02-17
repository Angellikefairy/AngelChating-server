import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    message_id: number;

    @Column({type: "char", length: 100})
    message_from_id: string;

    @Column({type: "char", length: 100})
    message_to_id: string;

    @Column({type: "int", width: 1})
    message_type: number;

    @Column({type: "text"})
    message_content: string;

    @Column({type: "char", length: 20})
    message_content_type: string;

    @Column({type: "datetime"})
    message_created_time: string;

    @Column({type: "int", width: 1})
    message_state: number;
}