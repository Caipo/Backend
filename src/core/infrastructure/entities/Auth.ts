import { Column, Entity, Unique, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRecord } from "./User";

@Entity({ name: "user_sessions" })
@Unique(["id", "token"])
export class UserSessionRecord {
	@PrimaryGeneratedColumn("uuid", { name: "id" })
	id: string;

	@Column({ name: "token", type: "varchar", length: 32 })
	token: string;

	@Column({ name: "created_at", type: "bigint" })
	createdAt: bigint;

	@Column({ name: "expire_at", type: "bigint" })
	expiredAt: bigint;

	@ManyToOne(() => UserRecord, (user) => user.sessions)
	user: UserRecord;
}
