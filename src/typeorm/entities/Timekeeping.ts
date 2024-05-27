import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'timekeeping'})
export class Timekeeping {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:string;

    @ManyToOne(()=> User, user => user.leave)
    user: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    checked_time:Date;

}