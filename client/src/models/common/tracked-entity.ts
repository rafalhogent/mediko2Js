import { v4 as uuidv4 } from 'uuid';

export class TrackedEntity {
  id: string = uuidv4();
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
  deletedAt?: Date | null = null;
  isDeleted?: boolean = false;
}
