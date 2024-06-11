import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718081191033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "tribe_messages" (
                "id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
                "sender_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tribe_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "message" character varying(280) NOT NULL,
                "created_at" bigint NOT NULL,
                CONSTRAINT "PK_message_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP TABLE "tribe_messages"
        `);
    }

}
