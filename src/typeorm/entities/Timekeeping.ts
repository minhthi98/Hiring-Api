import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'timekeeping'})
export class Timekeeping {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

    @ManyToOne(()=> User, user => user.leave)
    user: User;

    @Column()
    checked_time:Date;
}