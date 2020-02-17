import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("prefer_setting")
export class PreferSetting {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    prefer_setting_id: number;

    @Column({type: "int", width: 10})
    theme_id: number;

    @Column({type: "int", width: 1})
    tone_if: number;

    @Column({type: "int", width: 10})
    tone_id: number;

    @Column({type: "int", width: 1})
    desktop_reminder: number;
}