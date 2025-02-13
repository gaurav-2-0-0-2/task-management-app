import {Controller, Get, Post, Body, Param, Delete, Put} from '@nestjs/common';
import {TaskService} from './task.service';
import {ICreateTaskRequest, IUpdateTaskRequest} from './task.interface';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all/:id')
  async findAll(@Param('id') id: number): Promise<any> {
    return this.taskService.getTasks(id);
  }

  @Post('create')
  async create(@Body() body: ICreateTaskRequest): Promise<any> {
    return this.taskService.createTask(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} task`;
  }

  @Put('completed/:id')
  async completed(@Param('id') id: number): Promise<any> {
    return this.taskService.markTaskAsCompleted(id);
  }
  
  @Put('update/:id')
  async update(@Param('id') id: number, @Body() body: IUpdateTaskRequest): Promise<any> {
    return this.taskService.updateTask(id, body);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.taskService.deleteTask(id);
  }
}
