import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';


@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>
  ) {}

  async createFarmBuilding(
    farmId: string,
    name: string,
    farmUnit: string,
  ) {
    const building = this.buildingRepository.create({
      farmId,
      name,
      farmUnit,
    });

    return this.buildingRepository.save(building);
  }

  async getBuildings(farmId) {
    const farms = await this.buildingRepository.find({
      where: { farmId },
      order: {
        createdAt: 'DESC',
      },
      relations: ['units'],
    });

    return farms;
  }

  async getBuildingFarmUnits(buildingId: string) {
    const building = await this.buildingRepository.findOne(buildingId, {
      relations: ['units'],
      order: {
        createdAt: 'DESC',
      },
    });

    if (!building) {
      throw new NotFoundException(`Farm ${buildingId} not found`);
    }
    return building;
  }
}
