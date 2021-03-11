import {
 Controller,
 Post,
 Body,
 Get,
 Param,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { Farm } from './farms.model';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  async addFarm(@Body('name') name: string): Promise<Farm | { error: string}> {
    return this.farmsService.addFarm(name);
  }

  @Get(':id')
  async getFarm(@Param('id') farmId: string): Promise<Farm> {
    return this.farmsService.getFarmBuildings(farmId);
  }

  @Get()
  async getAllFarms(): Promise<Farm[]> {
    return this.farmsService.getFarms();
  }
}
