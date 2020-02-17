import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tone {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    tone_id: number;

    @Column({type: "char", length: 20})
    tone_name: string;

    @Column({type: "char", length: 255})
    tone_url: string;
}