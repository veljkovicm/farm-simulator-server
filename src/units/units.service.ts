import { Injectable, NotFoundException } from '@nestjs/common';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Building } from 'src/buildings/entities/building.entity';
import { Cron } from '@nestjs/schedule';
import { FarmUnitStatus } from '../contants';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitsRepository: Repository<Unit>,
    @InjectRepository(Building)
    private readonly buildingsRepository: Repository<Building>
  ) {}

  async addUnit(buildingId) {
    const building = await this.buildingsRepository.findOne(buildingId);

    const unit = await this.unitsRepository.create({
      buildingId: building.id,
      name: building.farmUnit,
      farmId: building.farmId,
    });

    return this.unitsRepository.save(unit);
  }

  async getUnits(buildingId: string) {
    return this.unitsRepository.find({ 
      where: {buildingId},
      order: {
        createdAt: 'DESC'
      },
    });
  }

  async getSingleProduct(productId: string) {
    const farm = await this.unitsRepository.findOne(productId);

    if (!farm) {
      throw new NotFoundException(`Farm ${productId} not found`);
    }
    return farm;
  }

  async feedUnit(id: string) {
    const unit = await this.unitsRepository.findOne(id);

    const secSinceLastFed = (new Date().getTime() - unit.lastFedTime.getTime()) / 1000;

    if(secSinceLastFed <= 5) {
      return { error: 'Units can only be fed once every 5 seconds.'}
    }

    unit.health++;
    unit.lastFedTime = new Date();

    return this.unitsRepository.save(unit);
  }

  @Cron('* * * * * *')
  async handleStarwing() {
    const units = await this.unitsRepository.find();

    const unitIds = units
      .filter((unit) => {
        const secSinceLastFed = (new Date().getTime() - unit.lastFedTime.getTime()) / 1000;
        return secSinceLastFed > 10;
      })
      .map(({ id }) => id);

    await this.unitsRepository
      .createQueryBuilder()
      .update()
      .set({ lastFedTime: new Date(), health: () => "health - 1" })
      .where({ id: In(unitIds), health: Between(1, 100)})
      .execute();


    return this.unitsRepository
      .createQueryBuilder()
      .update()
      .set({ status: FarmUnitStatus.DEAD })
      .where({ health: 0 })
      .execute();
  }
}
