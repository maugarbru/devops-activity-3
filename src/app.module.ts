import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { MedicalHistory } from './entities/medical-history.entity';
import { MedicalHistoriesController } from './controller/medical-histories/medical-histories.controller';
import { MedicalHistoriesService } from './services/medical-histories.service';
import { MedicalDiagnostic } from './entities/medical-diagnostic.entity';
import { MedicalDiagnosticController } from './controller/medical-diagnostic/medical-diagnostic.controller';
import { MedicalDiagnosticService } from './services/medical-diagnostic.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User, MedicalHistory, MedicalDiagnostic]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AppController,
    MedicalHistoriesController,
    MedicalDiagnosticController,
  ],
  providers: [
    AppService,
    UserService,
    MedicalHistoriesService,
    MedicalDiagnosticService,
  ],
})
export class AppModule {}

//Configuration ORM, and database
