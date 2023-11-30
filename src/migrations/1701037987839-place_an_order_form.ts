import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlaceAnOrderForm1701037987839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "place_an_order_form" (id SERIAL PRIMARY KEY,"fullName" VARCHAR NOT NULL,"email" VARCHAR NOT NULL,"service" VARCHAR NOT NULL,"deliveryTime" INTERVAL NOT NULL,"pages" INT NOT NULL,"coupon" VARCHAR,"writerAndEditorLevel" VARCHAR NOT NULL,"file" text NOT NULL,"message" TEXT)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "place_an_order_form"`);
  }
}
