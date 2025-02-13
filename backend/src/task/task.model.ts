import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from '../auth/user.model';

@Table({tableName: 'tasks'})
export class Task extends Model<Task> {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: string; // 'pending', 'completed'

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
