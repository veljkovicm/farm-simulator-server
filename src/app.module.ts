import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmsModule } from './farms/farms.module';
import { UnitsModule } from './units/units.module';
import { BuildingsModule } from './buildings/buildings.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    FarmsModule,
    UnitsModule,
    BuildingsModule,
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
