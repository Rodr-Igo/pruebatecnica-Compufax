import { PartialType } from '@nestjs/mapped-types';
import { OrdenResponseDto } from './orden-response.dto';

export class UpdateOrdeneDto extends PartialType(OrdenResponseDto) {}
