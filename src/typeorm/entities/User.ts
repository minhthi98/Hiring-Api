import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timekeeping } from "./Timekeeping";

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

    @Column()
    name:string;

    @Column()
    phone_number: string;

    @Column()
    position: string;

    @Column()
    user_role: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    dob: Date;

    @Column()
    join_date: Date;

    @Column()
    department: string;

    @Column( {nullable: true})
    team: string;

    @Column({default: "1"})
    password: string;

    @Column()
    device_id: string;

    @Column()
    createAt: Date;

    @Column()
    createBy: string;


}