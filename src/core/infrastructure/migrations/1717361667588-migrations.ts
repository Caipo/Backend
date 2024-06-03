import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717361667588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
		await queryRunner.query(`
            ALTER TABLE user_sessions ADD COLUMN tokens VARCHAR(32);
        `);
	}


    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE user_sessions DROP COLUMN tokens;
        `);
    }

}
