import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EyePhotosModule } from './eye-photos/eye-photos.module';
import { CommentsModule } from './comments/comments.module';
import { Table1Module } from './table-1/table-1.module';
import { Table2Module } from './table-2/table-2.module';
import { Table3Module } from './table-3/table-3.module';

@Module({
  imports: [

    // Config
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`]
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        }
      }
    }),

    // Module
    AuthModule,
    UsersModule,
    EyePhotosModule,
    CommentsModule,
    Table1Module,
    Table2Module,
    Table3Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
