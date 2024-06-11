import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRecord } from "./User";

@Entity({ name: "user_sessions" })
export class UserSessionRecord {
	@PrimaryGeneratedColumn("uuid", { name: "id" })
	id: string;

	@Column({ name: "created_at", type: "bigint" })
	createdAt: bigint;

	@Column({ name: "expire_at", type: "bigint" })
	expireAt: bigint;

	@ManyToOne(() => UserRecord, (user) => user.sessions)
	user: UserRecord;
}
