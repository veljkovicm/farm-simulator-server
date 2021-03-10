import { Building } from 'src/buildings/entities/building.entity';
import { Unit } from 'src/units/entities/unit.entity';
import {
 Column,
 Entity,
 OneToMany,
 PrimaryGeneratedColumn, 
} from 'typeorm';

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Building, (building) => building.farmId)
  buildings: Building[];

  @Column({ name: 'last_fed_time', default: () => 'CURRENT_TIMESTAMP' })
  lastFedTime: Date;

  @OneToMany(() => Unit, (unit) => unit.farmId)
  units: Unit[];

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
