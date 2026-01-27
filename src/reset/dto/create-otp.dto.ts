import { IsEmail, IsString } from 'class-validator';

export class Createotpdto {
  @IsString()
  username: string;
}