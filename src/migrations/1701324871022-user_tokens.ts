import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTokens1701324871022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user_tokens" (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "refreshToken" TEXT NOT NULL,
        "deletedAt" TIMESTAMP,
        "expiresAt" TIMESTAMP NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_tokens"`);
  }
}
