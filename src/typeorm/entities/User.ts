import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { Timekeeping } from "./Timekeeping";
import { Leave } from "./Leave";
import { Department } from "./Department";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users'})
@Unique(['phone_number'])
@Unique(['email'])
export class User {
    @PrimaryColumn({ length: 20 }) 
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

    @ManyToOne(()=> Department, department => department.users)
    department: Department;

    @Column( {nullable: true})
    team: string;

    @Column({nullable: false})
    password: string;

    @Column()
    device_id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date;

    @Column({default: true})
    activate: boolean;
    
    @Column()
    createBy: string;

    @Column({ type: 'timestamp', nullable: true })
    updateAt: Date;

    @Column()
    updateBy: string;

    @OneToMany(() => Leave, (leave) => leave.user)
    leave: Leave[];

    @OneToMany(() => Timekeeping, (timekeeping) => timekeeping.user)
    timekeeping: Timekeeping[];

    // Function to generate employee code
    @BeforeInsert()
    async generateEmployeeCode() {
        // Generate a random number with 5 digits
        const randomNumber = Math.floor(10000 + Math.random() * 90000).toString().substring(0, 5);
        // Generate a UUID for the user id
        this.id = `HR${this.user_role}${randomNumber}`;
    }
    @BeforeInsert()
    async hashPassword() {
        if (!this.password) {
            this.password = "1";
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}
