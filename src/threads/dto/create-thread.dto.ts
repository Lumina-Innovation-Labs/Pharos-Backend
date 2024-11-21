import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateThreadDto {
  @IsInt()
  @IsNotEmpty()
  id_user: number;

  @IsNotEmpty()
  title: string;

  timestamp: string;
}
