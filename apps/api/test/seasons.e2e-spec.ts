import { ValidationPipe } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "src/app.module";

describe("Seasons (e2e)", () => {
    let app: NestFastifyApplication;

    beforeAll(async () => {
        const moduleFixture:TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
            
        app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
        app.setGlobalPrefix("api/v1");
        app.useGlobalPipes(new ValidationPipe());

        await app.init();
        await app.getHttpAdapter().getInstance().ready();
    });

    afterAll(async () => await app.close());

    describe("GET /api/v1/seasons", () => {
        it("should return all seasons", async () => {
            const response = await request(app.getHttpServer())
                .get("/api/v1/seasons")
                .expect(200);

            expect(response.body).toHaveProperty("data");
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe("GET /api/v1/seasons/:year", () => {
        it("should return a single season", async () => {
            const response = await request(app.getHttpServer())
                .get("/api/v1/seasons/2024")
                .expect(200);

        expect(response.body).toHaveProperty("year", 2024);
        expect(response.body).toHaveProperty("champion");
        expect(response.body).toHaveProperty("runnerUp");
        });

        it("should return 404 for non-existent season", async () => {
            await request(app.getHttpServer())
                .get("/api/v1/seasons/1999")
                .expect(404);
        });
    });
});