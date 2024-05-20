import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1716072969033 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "profile_picture_url" character varying(500) NOT NULL,
                "display_name" character varying(50) NOT NULL,
                "username" character varying(50) NOT NULL,
                "biography" character varying(2000) NOT NULL,
                CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "user_sessions" (
                "id" SERIAL NOT NULL,
                "created_at" bigint NOT NULL,
                "expire_at" bigint NOT NULL,
                "userId" integer,
                CONSTRAINT "PK_user_sessions_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_sessions_userId" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_user_sessions_userId";
    DROP TABLE "user_sessions";
    DROP TABLE "users";
  `);
  }
}
