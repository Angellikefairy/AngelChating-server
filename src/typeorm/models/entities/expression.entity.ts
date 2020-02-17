import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Expression {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    expression_id: number;

    @Column({type: "int", width: 1})
    expression_type: number;

    @Column({type: "char", length: 255})
    expression_url: string;
}

