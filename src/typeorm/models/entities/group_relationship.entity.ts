import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("group_relationship")
export class GroupRelationship {
    @Column({type: "char", length: 100})
    @PrimaryColumn()
    user_id: string;

    @Column({type: "char", length: 100})
    @PrimaryColumn()
    group_id: string;

    @Column({type: "int", width: 1})
    top_if: number;

    @Column({type: "char", length: 10})
    group_member_type: string;
}