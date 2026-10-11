import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeHashFieldInUser1790769060039 implements MigrationInterface {
    name = 'ChangeHashFieldInUser1790769060039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hash" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hash" character varying(5) NOT NULL`);
    }

}
