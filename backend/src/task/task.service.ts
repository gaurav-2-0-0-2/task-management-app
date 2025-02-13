import { Injectable } from '@nestjs/common';
import { ICreateTaskRequest, IUpdateTaskRequest } from './task.interface';
import { Task } from './task.model';
import { User } from '../auth/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,

    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createTask(data: ICreateTaskRequest): Promise<any> {
    try {
      const { userId, title, description } = data;
      if (!title || !description) {
        throw new Error('Invalid input');
      }
      if (userId) {
        const user = await this.userModel.findByPk(userId);
        if (!user) {
          throw new Error('User not found');
        }
      } else {
        throw new Error('userId is required');
      }
      const task = await this.taskModel.create({
        userId,
        title,
        description,
      } as Task);
      return task;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async getTasks(userId: number): Promise<any> {
    try {
      const tasks = await this.taskModel.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });
      return tasks;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async deleteTask(id: number): Promise<any> {
    try {
      const task = await this.taskModel.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      await task.destroy();
      return task;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async markTaskAsCompleted(id: number): Promise<any> {
    try {
      const task = await this.taskModel.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      task.status = 'completed';
      task.save();
      return task;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async updateTask(id: number, data: IUpdateTaskRequest): Promise<any> {
    try {
      const task = await this.taskModel.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      const { title, description } = data;
      if (!title || !description) {
        throw new Error('Invalid input');
      }
      task.title = title;
      task.description = description;
      task.save();
      return task;
    } catch (err: any) {
      console.error(err);
      return err;
    }
  }
}
