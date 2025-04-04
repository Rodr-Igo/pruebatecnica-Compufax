import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
    @IsString()
    producto: string;
  
    @IsInt()
    cantidad: number;
  }

export class CreateOrdenDto {
    @IsInt()
    cliente_id: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];
}