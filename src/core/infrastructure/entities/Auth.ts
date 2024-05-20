import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "user_sessions" })
export class UserSession {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "created_at", type: "bigint" })
  createdAt: string;

  @Column({ name: "expire_at", type: "bigint" })
  expireAt: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
}
