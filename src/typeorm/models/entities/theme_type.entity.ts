import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("theme_type")
export class ThemeType {
    @Column({type: "int", width: 10})
    @PrimaryGeneratedColumn()
    theme_type_id: number;

    @Column({type: "char", length: 20})
    theme_type_name: string;
}

