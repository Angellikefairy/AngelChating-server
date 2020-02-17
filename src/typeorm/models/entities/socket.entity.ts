import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Socket {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    _id: number;

    @Column({type: "char", length: 100, unique: true, nullable: true})
    socket_id: string;

    @Column({type: "char", length: 30, nullable: true})
    ip: string;
}