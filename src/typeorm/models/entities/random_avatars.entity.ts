import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('random_avatars')
export class RandomAvatars {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    random_avatar_id: number;

    @Column({type: "char", length: 255})
    random_avatar_url: string;
}