import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtColumn21678992857345 implements MigrationInterface {
    name = 'AddDeletedAtColumn21678992857345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "deleted_at" TO "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deletedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deletedAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deletedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deletedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "deletedAt" TO "deleted_at"`);
    }

}
