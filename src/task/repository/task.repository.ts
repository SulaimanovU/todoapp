import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { User } from "src/auth/entities/user.entity";
import { AddTaskDto } from "../utils/dto/add-task.dto";
import { UpdateTaskDto } from "../utils/dto/update-task.dto";


@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) { }

  async createTask(taskData: AddTaskDto, userEntity: User): Promise<Task> {
    const task = this.taskRepository.create({...taskData, user: userEntity})
    return await this.taskRepository.save(task);
  }

  async getTasksByUser(userEntity: User): Promise<Task[]> {
    return await this.taskRepository.findBy({ user: { id: userEntity.id } })
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if(!task) return null;

    return await this.taskRepository.remove(task);
  }

  async updateTask(taskData: UpdateTaskDto, userEntity: User): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: taskData.id, user: { id: userEntity.id } });

    if(!task) {
      return null;
    }

    task.text = taskData.text;
    return await this.taskRepository.save(task);
  }
}