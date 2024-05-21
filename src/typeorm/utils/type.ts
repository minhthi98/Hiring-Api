import { Department } from "src/typeorm/entities/Department";

export type CreateUserParams ={
    name: string;

    phone_number: string;

    position: string;

    user_role: number;

    email: string;

    team?: string;

    address: string;

    gender: string;

    dob: Date;

    join_date:string;
    
    department?: any;
}