import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1701179102950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (id SERIAL PRIMARY KEY,
        "fullName" VARCHAR NOT NULL,
        "email" VARCHAR NOT NULL,
        "password" TEXT NOT NULL,
        "phone" VARCHAR)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
