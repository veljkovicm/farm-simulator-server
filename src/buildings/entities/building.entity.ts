import { Farm } from 'src/farms/entities/farm.entity';
import { Unit } from 'src/units/entities/unit.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'farm_id' })
  @ManyToOne(() => Farm, (farm) => farm.buildings)
  farmId: string;

  @Column({ name: 'farm_unit' })
  farmUnit: string; // add type if we're going to use predefined values for farm units

  @OneToMany(() => Unit, (unit) => unit.buildingId)
  units: Unit[];

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
