import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "profile_picture_url", type: "varchar", length: 500})
    profilePictureUrl: string;

    @Column({name: "display_name", type: "varchar", length: 50})
    displayName: string;

    @Column({name: "username", type: "varchar", length: 50})
    username: string;

    @Column({name: "biography", type: "varchar", length: 2000})
    biography: string;
}