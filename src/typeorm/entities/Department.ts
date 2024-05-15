import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'department'})
export class Department {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

    @Column()
    name:string;

    @Column()
    address:string;

    @OneToMany(() => User, (user) => user.department)
    user: User;
}