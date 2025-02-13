import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Task} from './task.model';
import {User} from '../auth/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Task, User])],
  controllers: [TaskController],
  providers: [TaskService],
})

export class TaskModule {}
