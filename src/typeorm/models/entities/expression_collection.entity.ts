import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("expression_collection")
export class ExpressionCollection {
    @Column({type: "char", length: 100})
    @PrimaryColumn()
    user_id: string;

    @Column({type: "int", width: 10})
    @PrimaryColumn()
    expression_id: number;
}