import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import {
  Between,
  In,
  Repository,
} from 'typeorm';
import * as config from 'config';
import { Farm } from './entities/farm.entity';
import { Unit } from '../units/entities/unit.entity';
import { Farm as FarmModel } from './farms.model';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmsRepository: Repository<Farm>,
    @InjectRepository(Unit)
    private readonly unitsRepository: Repository<Unit>
  ) {}

  async addFarm(name: string): Promise<FarmModel | { error: string }> {
    const alreadyExists = await this.farmsRepository.findOne({ name });

    if(alreadyExists) {
      return { error: 'There\' already a farm with this name!'}
    }

    const farm = await this.farmsRepository.create({ name });

    return this.farmsRepository.save(farm);
  }

  async getFarms(): Promise<Farm[]> {
    return this.farmsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getFarmBuildings(farmId: string): Promise<Farm> {
    const farm = await this.farmsRepository.findOne(farmId, {
      relations: ['buildings'],
      order: {
        createdAt: 'DESC',
      },
    });

    if (!farm) {
      throw new NotFoundException(`Farm ${farmId} not found`);
    }
    return farm;
  }

  @Cron('* * * * * *')
  async handleFarmFeeding(): Promise<void> {
    const farms = await this.farmsRepository.find({
      relations: ['buildings']
    });

    const farmsForFeeding = farms
      .filter((farm) => {
        const secSinceLastFed = (new Date().getTime() - farm.lastFedTime.getTime()) / 1000;
        return secSinceLastFed > config.farmFeedingInterval;
      });

    const farmIds = farmsForFeeding.map(({ id }) => id);

    // pull only building IDs from farms that are due for feeding
    const buildingIds = _.flatten(
      farmsForFeeding
        .map(({ buildings }) => buildings.map((building) => building.id))
    );

    await this.farmsRepository
      .createQueryBuilder()
      .update()
      .set({ lastFedTime: new Date()})
      .where({ id: In(farmIds) })
      .execute();

    await this.unitsRepository
      .createQueryBuilder()
      .update()
      .set({ lastFedTime: new Date(), health: () => "health + ((100 - health) / 2)" })
      .where({ buildingId: In(buildingIds), health: Between(0, 100)})
      .execute()
  }
}