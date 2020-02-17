import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Friendship {
    @Column({type: "char", length: 100})
    @PrimaryColumn()
    from_user_id: string;

    @Column({type: "char", length: 100})
    @PrimaryColumn()
    to_user_id: string;

    @Column({type: "datetime"})
    add_friend_time: string;

    @Column({type: "datetime", nullable: true})
    agree_time: string;

    @Column({type: "int", width: 1})
    friendship_state: number;

    @Column({type: "int", width: 1})
    friendship_type: number;

    @Column({type: "int", width: 1})
    top_if: number;
}