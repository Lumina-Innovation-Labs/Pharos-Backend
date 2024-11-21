import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  id_thread: number;

  @IsNotEmpty()
  content: string;

  from_user: boolean;

  timestamp: string;
}
