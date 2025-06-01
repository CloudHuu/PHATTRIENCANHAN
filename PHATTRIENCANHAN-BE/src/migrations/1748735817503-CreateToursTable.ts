import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateToursTable1748735817503 implements MigrationInterface {
    name = 'CreateToursTable1748735817503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tours" (
            "id" int NOT NULL IDENTITY(1,1),
            "name" nvarchar(255) NOT NULL,
            "description" nvarchar(MAX) NOT NULL,
            "price" decimal(10,2) NOT NULL,
            "duration" int NOT NULL,
            "images" nvarchar(MAX) NOT NULL,
            "location" nvarchar(255) NOT NULL,
            "title" nvarchar(255),
            "highlights" nvarchar(MAX),
            "included" nvarchar(MAX),
            "excluded" nvarchar(MAX),
            "isActive" bit NOT NULL CONSTRAINT "DF_tours_isActive" DEFAULT 1,
            "isNew" bit NOT NULL CONSTRAINT "DF_tours_isNew" DEFAULT 0,
            "createdAt" datetime2 NOT NULL DEFAULT getdate(),
            "updatedAt" datetime2 NOT NULL DEFAULT getdate(),
            CONSTRAINT "PK_tours" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tours"`);
    }
} 