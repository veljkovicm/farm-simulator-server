import { BuildingService } from './buildings.service';
import {
 Controller,
 Post,
 Body,
 Get,
 Query,
} from '@nestjs/common';
import { Building } from './buildings.model';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  async createFarmBuilding(
    @Body() building: Building
  ): Promise<Building> {
    return this.buildingService.createFarmBuilding(
      building.farmId,
      building.name,
      building.farmUnit,
    );
  }

  @Get()
  async getAllFarmBuildings(@Query('id') farmId: string): Promise<Building[]> {
    return this.buildingService.getBuildings(farmId);
  }
}
