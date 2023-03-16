import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Task } from "./entities/task.entity";
import { TaskController } from "./controllers/task.controller";
import { TaskRepository } from "./repository/task.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Task]), AuthModule],
    controllers: [TaskController],
    providers: [TaskRepository],
})
export class TaskModule {}