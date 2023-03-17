import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    text: string;
    @ApiProperty()
    createdAt: string;

    constructor(id: string, text: string, createdAt: Date) {
        this.id = id;
        this.text = text;
        this.createdAt = String(createdAt);
    }
}