import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 50 })
  avatar_path: string;

  @Column({ type: 'int' })
  tribe_id: number;

  @Column({ type: 'varchar' })
  password: string;

}
