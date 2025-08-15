import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TransactionService } from './transaction.service';

@Global()
@Module({
  imports: [
    ConfigModule, // để TypeOrmModule dùng được config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [join(__dirname, '/../modules/**/*.entity.{ts,js}')],
        migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
        synchronize: false,
        ssl: false,
      }),
    }),
  ],
  controllers: [],
  providers: [TransactionService],
  exports: [TypeOrmModule, TransactionService],
})
export class DatabaseModule {}
