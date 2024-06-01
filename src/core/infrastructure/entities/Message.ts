import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRecord } from "./User";

@Entity({ name: "tribe_messages" })
export class MessageRecord {
	@PrimaryGeneratedColumn("uuid", { name: "id" })
	id: string;

	@Column({ name: "message", type: "varchar", length: 280 })
	message: string;

	@Column({ name: "created_at", type: "bigint" })
	createdAt: bigint;

	@ManyToOne(() => UserRecord, (user) => user.messages)
	@JoinColumn({ name: "sender_id" })
	senderId: UserRecord;
}
