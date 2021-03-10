import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { Farm } from './entities/farm.entity';
import { Building } from 'src/buildings/entities/building.entity';
import { Unit } from 'src/units/entities/unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Farm,
      Building,
      Unit,
    ])],
  controllers: [FarmsController],
  providers: [FarmsService],
})
export class FarmsModule {}
