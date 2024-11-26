import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Configuring TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Configuring dotenv
import { ConfigModule, ConfigService } from '@nestjs/config';

// App modules
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { ThreadsModule } from './threads/threads.module';
import { JwtModule } from '@nestjs/jwt';
import { AxiosModule } from './common/axios/axios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 3306,
        username: configService.get<string>('DB_USER') || 'root',
        password: configService.get<string>('DB_PASSWORD') || '12345678',
        database: configService.get<string>('DB_DATABASE') || 'pharos_db',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UsersModule,
    ThreadsModule,
    MessagesModule,
    JwtModule,
    AxiosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
