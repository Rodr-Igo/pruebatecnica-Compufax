import { IsString, IsInt, IsEmail, Min } from 'class-validator';

export class CreateClientDto {  
    @IsString()
    nombre: string;
  
    @IsString()
    apellido: string;
  
    @IsInt()
    @Min(0)
    edad: number;
  
    @IsEmail()
    email: string;
  }
