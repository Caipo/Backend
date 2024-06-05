import { Column, Entity, Unique, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRecord } from "./User";

@Entity({ name: "tribes" })
@Unique(["id"])
export class TribeRecord {
	@PrimaryGeneratedColumn("uuid", { name: "id" })
	@OneToMany(() => UserRecord, (user) => user.tribeId)
	id: string;

	@Column({ name: "tribe_name", type: "varchar", length: 20})
	tribeName: string;

	@Column({ name: "about", type: "varchar", length: 2000 })
    about: string;
    
	@Column({ name: "created_at", type: "bigint" })
	createdAt: bigint;
}
