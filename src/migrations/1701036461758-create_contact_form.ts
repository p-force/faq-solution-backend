import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactForm1701036461758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "contact_form" (id SERIAL PRIMARY KEY,"fullName" VARCHAR NOT NULL,"phone" VARCHAR NOT NULL,"email" VARCHAR NOT NULL,"topic" VARCHAR NOT NULL,"message" TEXT NOT NULL)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contact_form"`);
  }
}
