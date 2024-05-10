import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'leave'})
export class Leave {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

    @Column()
    user_id:string;

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
}