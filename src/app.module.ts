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
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.AZURE_SQL_HOST || '',
      port: 1433,
      username: process.env.AZURE_SQL_USER || '',
      password: process.env.AZURE_SQL_PASSWORD || '',
      database: process.env.AZURE_SQL_DB || '',
      entities: [User, MedicalHistory, MedicalDiagnostic],
      autoLoadEntities: true,
      extra: {
        encrypt: true,
      },
      synchronize: true, //use this with development enviroment
    })
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
