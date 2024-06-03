import { Column, Entity, Unique, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserSessionRecord } from "./Auth";
import { MessageRecord } from "./Message";

@Entity({ name: "users" })
@Unique(['id'])
export class UserRecord {
	@PrimaryGeneratedColumn("uuid", { name: "id" })
	id: string;

	@Column({ name: "profile_picture_url", type: "varchar", length: 500 })
	profilePictureUrl: string;

	@Column({ name: "display_name", type: "varchar", length: 50 })
	displayName: string;

	@Column({ name: "username", type: "varchar", length: 50 })
	username: string;

	@Column({ name: "password", type: "varchar", length: 255, default: "invalidPassword" })
	password: string;

	@Column({ name: "biography", type: "varchar", length: 2000 })
	biography: string;

	@Column({ name: "created_at", type: "bigint" })
	createdAt: bigint;

	@OneToMany(() => MessageRecord, (message) => message.senderId)
	messages: MessageRecord[];

	@OneToMany(() => UserSessionRecord, (session) => session.user)
	sessions: UserSessionRecord[];
}
