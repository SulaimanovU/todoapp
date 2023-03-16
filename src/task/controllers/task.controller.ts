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

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }


  @ApiResponse({ status: 200, type: AddTaskDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  private async addTask(@Body() taskData: AddTaskDto, @Req() req) {
    return this.taskRepository.createTask(taskData, req.user);
  }

  @ApiResponse({ status: 200, type: UpdateTaskDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  private async updateTask(@Body() taskData: UpdateTaskDto, @Req() req) {
    const result = this.taskRepository.updateTask(taskData, req.user);
    if(!result) {
      throw new ForbiddenException('You do not have access to update this record');
    }
    return result;
  }

  @ApiResponse({ status: 200, type: Array<UpdateTaskDto> })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  private async getTasks(@Req() req) {
    return this.taskRepository.getTasksByUser(req.user);
  }

  @ApiResponse({ status: 200, type: UpdateTaskDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  private async deleteTask(@Param('id') id: string) {
    return this.taskRepository.deleteTask(id);
  }
}

