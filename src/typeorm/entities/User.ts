import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Timekeeping } from "./Timekeeping";
import { Leave } from "./Leave";
import { Department } from "./Department";
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'users'})
export class User {
    @PrimaryColumn({ length: 20 }) // Đặt độ dài cho mã nhân viên, ví dụ 20 ký tự
    id: string;

    @Column()
    name:string;

    @Column()
    phone_number: string;

    @Column()
    position: string;

    @Column()
    user_role: number; // Kiểu dữ liệu là number

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

    @ManyToOne(()=> Department, department => department.user)
    department: Department;

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

    @OneToMany(() => Leave, (leave) => leave.user)
    leave: Leave;

    @OneToMany(() => Timekeeping, (timekeeping) => timekeeping.user)
    timekeeping: Timekeeping;

    // Function to generate employee code
    @BeforeInsert()
    async generateEmployeeCode() {
        // Generate a random number with 5 digits
        const randomNumber = Math.floor(10000 + Math.random() * 90000).toString().substring(0, 5);
        // Generate a UUID for the user id
        this.id = `HR${this.user_role}${randomNumber}`;
    }
}
