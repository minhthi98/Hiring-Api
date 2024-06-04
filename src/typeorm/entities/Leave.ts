import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'leave'})
export class Leave {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:string;

    @Column()
    leave_date_start:Date;

    @Column()
    leave_date_end:Date;

    @Column()
    reason: string;

    @Column()
    status: string;

    @Column()
    type: string;

    @ManyToOne(()=> User, user => user.leave)
    user: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date;

    @Column()
    createBy: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updateAt: Date;

    @Column()
    updateBy: string;
}