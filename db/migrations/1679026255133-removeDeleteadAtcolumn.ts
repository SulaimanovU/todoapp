import { MigrationInterface, QueryRunner } from "typeorm";

export class removeDeleteadAtcolumn1679026255133 implements MigrationInterface {
    name = 'removeDeleteadAtcolumn1679026255133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_deleted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "task" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

}
