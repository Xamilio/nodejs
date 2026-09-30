import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeHashFieldInUserFor100Chars1790769293827 implements MigrationInterface {
    name = 'ChangeHashFieldInUserFor100Chars1790769293827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hash" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hash" character varying(50) NOT NULL`);
    }

}
