import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmsModule } from './farms/farms.module';
import { UnitsModule } from './units/units.module';
import { BuildingsModule } from './buildings/buildings.module';

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
