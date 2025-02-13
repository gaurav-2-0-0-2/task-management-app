import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType} from 'sequelize-typescript';  
import {Task} from '../task/task.model';

@Table({tableName: 'users'})
export class User extends Model<User> {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
