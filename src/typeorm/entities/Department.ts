import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'department'})
export class Department {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:string;

    @Column()
    name:string;

    @Column()
    address:string;

    @OneToMany(() => User, (user) => user.department)
    users: User[];

    @Column({ type: 'timestamp' })
    createAt: Date;

    @Column()
    createBy: string;

    @Column({ type: 'timestamp', nullable: true })
    updateAt: Date;

    @Column()
    updateBy: string;
}