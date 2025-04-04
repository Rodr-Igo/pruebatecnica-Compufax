import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateDireccioneDto } from './create-direccione.dto';

export class UpdateDireccioneDto extends PartialType(CreateDireccioneDto) {
    @IsString()
    calle: string;
  
    @IsString()
    ciudad: string;
  
    @IsString()
    codigo_postal: string;
}

