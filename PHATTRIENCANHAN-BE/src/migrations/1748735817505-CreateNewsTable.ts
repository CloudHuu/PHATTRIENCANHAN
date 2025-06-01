import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewsTable1748735817505 implements MigrationInterface {
    name = 'CreateNewsTable1748735817505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" (
            "id" int NOT NULL IDENTITY(1,1),
            "title" nvarchar(255) NOT NULL,
            "category" nvarchar(255) NOT NULL,
            "date" datetime2 NOT NULL,
            "author" nvarchar(255) NOT NULL,
            "views" int NOT NULL CONSTRAINT "DF_news_views" DEFAULT 0,
            "image" nvarchar(255) NOT NULL,
            "description" nvarchar(MAX) NOT NULL,
            "content" nvarchar(MAX) NOT NULL,
            "isActive" bit NOT NULL CONSTRAINT "DF_news_isActive" DEFAULT 1,
            "createdAt" datetime2 NOT NULL CONSTRAINT "DF_news_createdAt" DEFAULT getdate(),
            "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_news_updatedAt" DEFAULT getdate(),
            CONSTRAINT "PK_news" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news"`);
    }
} 