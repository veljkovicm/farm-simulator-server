import {
 Controller,
 Post,
 Body,
 Get,
 Param,
 Patch, 
} from '@nestjs/common';
import { UnitsService } from './units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  async addUnit(
    @Body('buildingId') buildingId: string
  ) {
    return this.unitsService.addUnit(buildingId);
  }

  @Get(':id')
  async getUnits(@Param('id') buildingId: string) {
    return this.unitsService.getUnits(buildingId);
  }

  @Patch()
  async feedUnit(@Body('id') unitId: string) {
    return this.unitsService.feedUnit(unitId);
  }
}
