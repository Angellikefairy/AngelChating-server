import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Theme {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    theme_id: number;

    @Column({type: "int", width: 1})
    frosted_glass_effect: number;

    @Column({type: "char", length: 255})
    theme_background_url: string;

    @Column({type: "varchar", length: 10})
    theme_color: string;

    @Column({type: "varchar", length: 10})
    theme_font_color: string;

    @Column({type: "int", width: 10})
    theme_type_id: number;

    @Column({type: "float"})
    theme_opacity: number;
}