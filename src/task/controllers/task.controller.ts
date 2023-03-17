import { 
  Controller, 
  Post,
  Put,
  Body,
  Get,
  Req,
  UseGuards,
  ForbiddenException,
  Delete,
  Param
 } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { AddTaskDto } from "../utils/dto/add-task.dto";
import { UpdateTaskDto } from "../utils/dto/update-task.dto";
import { TaskRepository } from "../repository/task.repository";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TaskResponseDto } from "../utils/dto/task-response.dto";

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }


  @ApiResponse({ status: 200, type: TaskResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  private async addTask(@Body() taskData: AddTaskDto, @Req() req) {
    const { id, text, created_at } = await this.taskRepository.createTask(taskData, req.user);
    return new TaskResponseDto(id, text, created_at);
  }

  @ApiResponse({ status: 200, type: TaskResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  private async updateTask(@Body() taskData: UpdateTaskDto, @Req() req) {
    const task = await this.taskRepository.updateTask(taskData, req.user);
    if(!task) {
      throw new ForbiddenException('You do not have access to update this record');
    }

    return new TaskResponseDto(task.id, task.text, task.created_at);;
  }

  @ApiResponse({ status: 200, type: [TaskResponseDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  private async getTasks(@Req() req) {
    return this.taskRepository.getTasksByUser(req.user);
  }

  @ApiResponse({ status: 200, type: TaskResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  private async deleteTask(@Param('id') taskId: string) {
    const { id, text, created_at } = await this.taskRepository.deleteTask(taskId);
    return new TaskResponseDto(id, text, created_at);
  }
}

