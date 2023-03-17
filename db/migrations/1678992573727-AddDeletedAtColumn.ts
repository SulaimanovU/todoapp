import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtColumn1678992573727 implements MigrationInterface {
    name = 'AddDeletedAtColumn1678992573727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "deleted_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deleted_at"`);
    }

}
