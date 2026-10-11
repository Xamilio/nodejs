import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnDescription1790678166409 implements MigrationInterface {
    name = 'AddColumnDescription1790678166409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
    }

}
