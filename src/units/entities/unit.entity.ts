import { Building } from 'src/buildings/entities/building.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { getRandomHealth } from 'src/helpers/helpers';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'building_id' })
  @ManyToOne(() => Building, (building) => building.units)
  buildingId: string;
  
  @Column({ name: 'farm_id' })
  @ManyToOne(() => Farm, (farm) => farm.units)
  farmId: string;

  @Column()
  name: string;

  @Column()
  health: number;

  @Column({ name: 'last_fed_time', default: () => 'CURRENT_TIMESTAMP' })
  lastFedTime: Date;

  @Column({ default: 1 })
  status: number;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  // Hooks
  @BeforeInsert()
  setHealth() {
    this.health = getRandomHealth();
  }
}
