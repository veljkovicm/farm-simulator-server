import {
 Controller,
 Post,
 Body,
 Get,
 Param,
} from '@nestjs/common';
import { FarmsService } from './farms.service';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  async addFarm(@Body('name') name: string) {
    return this.farmsService.addFarm(name);
  }

  @Get(':id')
  async getFarm(@Param('id') farmId: string) {
    return this.farmsService.getFarmBuildings(farmId);
  }

  @Get()
  async getAllFarms() {
    return this.farmsService.getFarms();
  }
}
