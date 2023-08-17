import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MedicalHistory } from './medical-history.entity';

@Entity({ name: 'medical_diagnostics', schema: 'public' })
export class MedicalDiagnostic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at' })
  createdAt: string;

  @ManyToOne(() => MedicalHistory)
  @JoinColumn({ name: 'medical_history_id' })
  medicalHistory: MedicalHistory;
  @Column({ name: 'medical_history_id' })
  medicalHistoryId: number;
  @Column({ name: 'description' })
  description: string;
}
