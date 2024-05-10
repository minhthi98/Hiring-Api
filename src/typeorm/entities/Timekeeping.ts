import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'timekeeping'})
export class Timekeeping {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

    @Column()
    user_id:string;

    @Column()
    checked_time:Date;
}