import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    text: string;
}