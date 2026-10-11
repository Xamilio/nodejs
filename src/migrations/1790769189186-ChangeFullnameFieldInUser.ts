import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFullnameFieldInUser1790769189186 implements MigrationInterface {
    name = 'ChangeFullnameFieldInUser1790769189186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fullname" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fullname" character varying(2) NOT NULL`);
    }

}
