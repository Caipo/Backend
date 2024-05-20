import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1716072969033 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "profile_picture_url" character varying(500) NOT NULL,
                "display_name" character varying(50) NOT NULL,
                "username" character varying(50) NOT NULL,
                "password" character varying(255) NOT NULL DEFAULT 'invalidPassword',
                "biography" character varying(2000) NOT NULL,
                "created_at" bigint NOT NULL,
                CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
            )
        `);

		await queryRunner.query(`
            CREATE TABLE "user_sessions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" bigint NOT NULL,
                "expire_at" bigint NOT NULL,
                "userId" uuid,
                CONSTRAINT "PK_user_sessions_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_sessions_userId" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);

		await queryRunner.query(`
            CREATE INDEX "IDX_user_sessions_userId" ON "user_sessions" ("userId")
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP INDEX "IDX_user_sessions_userId"
        `);

		await queryRunner.query(`
            DROP TABLE "user_sessions"
        `);

		await queryRunner.query(`
            DROP TABLE "users"
        `);
	}
}
