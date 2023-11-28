import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1701179102950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "users" (id SERIAL PRIMARY KEY,"email" VARCHAR NOT NULL,"password" TEXT NOT NULL)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
