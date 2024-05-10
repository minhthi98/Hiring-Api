import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'deapartment'})
export class Deapartment {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

    @Column()
    name:string;

    @Column()
    address:string;

}