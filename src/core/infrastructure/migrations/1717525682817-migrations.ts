import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717525682817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE "tribes" (
                "id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
                "tribe_name" character varying(20) NOT NULL,
                "about" character varying(2000) NOT NULL,
                "created_at" bigint NOT NULL,
                CONSTRAINT "PK_Tribe_Id" PRIMARY KEY ("id")
            )
        `);

		await queryRunner.query(`
            ALTER TABLE users ADD tribeId uuid; 
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DROP TABLE "tribes"
        `);

		await queryRunner.query(`
            ALTER TABLE users DROP COLUMN tribeId 
        `);
    }

}
