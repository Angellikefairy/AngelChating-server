import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
    @Column({type: "varchar", length: 100})
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column({type: "varchar", length: 50, unique: true})
    user_name: string;

    @Column({type: "varchar", length: 100})
    user_saltPassword: string;

    @Column({type: "char", length: 255})
    user_avatar: string;

    @Column({type: "datetime"})
    user_reg_time: string;

    @Column({type: "datetime", nullable: true})
    user_lastLogin_time: string;

    @Column({type: "int", width: 1})
    user_state: number;

    @Column({type: "int", width: 10, unique: true, nullable: true})
    user_socketId: number;

    @Column({type: "int", width: 10, unique: true, nullable: true})
    user_preferSetting_id: number;
}
