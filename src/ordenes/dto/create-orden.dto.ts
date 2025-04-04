import { IsString, IsInt, IsOptional, IsDate } from 'class-validator';

export class CreateOrdenDto {
  @IsString()
  producto: string;

  @IsInt()
  cantidad: number;

  @IsOptional()
  @IsDate()
  fecha_pedido?: Date;

  @IsString()
  folio: string;
}