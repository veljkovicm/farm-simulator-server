import { BuildingService } from './buildings.service';
import {
 Controller,
 Post,
 Body,
 Get,
 Param,
 Query,
} from '@nestjs/common';
import * as _ from 'lodash';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  async createFarmBuilding(
    @Body('farmId') farmId: string,
    @Body('name') name: string,
    @Body('farmUnit') farmUnit: string,
  ) {
    return this.buildingService.createFarmBuilding(farmId, name, farmUnit);
  }

  @Get()
  async getAllFarmBuildings(@Query('id') farmId: string) {
    const buildings =  await this.buildingService.getBuildings(farmId);

    return _.keyBy(buildings, 'id');
  }

  @Get('/units/:id')
  async getBuildingUnits(@Param('id') buildingId: string) {
    return this.buildingService.getBuildingFarmUnits(buildingId);
  }
}
