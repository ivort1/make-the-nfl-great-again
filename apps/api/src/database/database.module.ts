import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDb } from '@repo/database';

const databaseProvider = {
    provide: "DATABASE",
    useFactory: (configService: ConfigService) => {
        return createDb(configService.get<string>("DATABASE_URL") ?? "");
    },
    inject: [ConfigService]
}

@Module({
    providers: [databaseProvider],
    exports: [databaseProvider]
})

export class DatabaseModule {}