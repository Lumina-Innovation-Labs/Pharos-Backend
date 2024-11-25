import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  id_thread: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
