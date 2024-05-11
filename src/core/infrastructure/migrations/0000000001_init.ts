import {MigrationInterface, QueryRunner} from "typeorm";

export class Init0000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the 'users' table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "profile_picture_url" VARCHAR(500),
                "display_name" VARCHAR(50),
                "username" VARCHAR(50),
                "biography" VARCHAR(2000)
            );
        `);

        // Create the 'user_sessions' table
        await queryRunner.query(`
            CREATE TABLE "user_sessions" (
                "id" SERIAL PRIMARY KEY,
                "created_at" BIGINT,
                "expire_at" BIGINT,
                "user_id" INTEGER,
                CONSTRAINT "FK_user_sessions_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the 'user_sessions' table first because of the foreign key constraint
        await queryRunner.query(`DROP TABLE "user_sessions";`);

        // Then drop the 'users' table
        await queryRunner.query(`DROP TABLE "users";`);
    }
}