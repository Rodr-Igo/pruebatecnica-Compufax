import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { CreateDireccioneDto } from './dto/create-direccione.dto';
import { UpdateDireccioneDto } from './dto/update-direccione.dto';
import { DireccionResponseDto } from './dto/get-direccione.dto';

@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @Post()
  async updateDireccion(
    @Query('id') id: string,
    @Body() dto: UpdateDireccioneDto,
  ) {
    const clienteId = parseInt(id);
    if (isNaN(clienteId)) {
      throw new BadRequestException('El parámetro "id" debe ser un número');
    }

    return this.direccionesService.updateDireccionByClienteId(clienteId, dto);
  }

  @Get()
  async findAll(): Promise<DireccionResponseDto[]> {
    return this.direccionesService.findAll();
  }

  @Get(':id')
async findOne(@Param('id') id: string) {
  const direccionId = parseInt(id);
  if (isNaN(direccionId)) {
    throw new BadRequestException('El parámetro "id" debe ser un número');
  }

  return this.direccionesService.findOne(direccionId);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.direccionesService.remove(+id);
  }
}
