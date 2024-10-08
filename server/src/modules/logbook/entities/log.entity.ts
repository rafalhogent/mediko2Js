import { TrackedEntity } from '@/modules/common/models/tracked.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Logbook } from './logbook.entity';
import { LogDto } from '../dto/logbook-sync.dto';
import { Type } from 'class-transformer';

const LOG_LOGBOOK_COL = 'logbookId';
const FK_LOG_LOGBOOK = 'FK_log-logbook';

@Entity()
export class Log extends TrackedEntity {
  constructor() {
    super();
  }
  @Type(() => Date)
  @Column({ nullable: true, default: null })
  moment: Date | null = new Date();

  @Column({ nullable: true, default: null, type: 'double' })
  value1?: number;

  @Column({ nullable: true, default: null, type: 'double' })
  value2?: number;

  @Column({ nullable: true, default: null, type: 'double' })
  value3?: number;

  @Column({ nullable: true, default: null, type: 'double' })
  value4?: number;

  @Column({ length: 255, nullable: true })
  comment?: string;

  [LOG_LOGBOOK_COL]: string;
  @ManyToOne(() => Logbook, (l) => l.logs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: LOG_LOGBOOK_COL,
    foreignKeyConstraintName: FK_LOG_LOGBOOK,
  })
  logbook: Logbook;

  //#region methods
  update(newLog: LogDto): void {
    this.moment = newLog.moment;
    this.value1 = newLog.value1;
    this.value2 = newLog.value2;
    this.value3 = newLog.value3;
    this.value4 = newLog.value4;
    this.comment = newLog.comment;
    this.updatedAt = newLog.updatedAt ?? new Date();
  }

  makeDeleted() {
    this.moment = null;
    delete this.value1;
    delete this.value2;
    delete this.value3;
    delete this.value4;
    delete this.comment;
    delete this.createdAt;
    delete this.updatedAt;
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
  //#endregion
}
