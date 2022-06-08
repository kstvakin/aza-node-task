import {CacheModule, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { WinstonModule } from 'nest-winston';
import { TransactionModule } from './modules/transaction/transaction.module';
import { GoogleApiService } from './modules/googleapi/googleapi.service';
import * as winston from 'winston';
import * as path from 'path';
import {EventEmitterModule} from "@nestjs/event-emitter";
import { EmitterService } from './modules/shared/emitter/emitter.service';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from "dotenv";
dotenv.config();

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        WinstonModule.forRoot({
            transports: [
                new winston.transports.File({
                    dirname: path.join(__dirname, '../log/error/'),
                    filename: 'error-' + new Date().toDateString().split(' ').join('_') + '.log',
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        winston.format.json()
                    ),
                }),
                new winston.transports.File({
                    dirname: path.join(__dirname, '../log/info/'),
                    filename: 'info-' + new Date().toDateString().split(' ').join('_') + '.log',
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        winston.format.json()
                    ),
                })
            ]
        }),
        TransactionModule,
        EventEmitterModule.forRoot(),
        CacheModule.register({
            store:redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        GoogleApiService,
        EmitterService
    ],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}