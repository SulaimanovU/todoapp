import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const typeOrmModuleOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: ['dist/**/*.entity.ts'],
    migrations: ['dist/db/migrations/*.js'],
}


export default new DataSource(typeOrmModuleOptions);