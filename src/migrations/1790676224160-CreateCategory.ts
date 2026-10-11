import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategory1790676224160 implements MigrationInterface {
    name = 'CreateCategory1790676224160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying(20) NOT NULL, "slug" character varying(30) NOT NULL, "image" character varying, "is_show" boolean NOT NULL DEFAULT true, "parent_id" integer, CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
