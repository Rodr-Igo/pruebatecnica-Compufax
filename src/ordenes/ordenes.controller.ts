import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}
  
  @Get()
  async findAll() {
    return this.ordenesService.findAll();
  }
  
  @Post()
  async create(@Body() dto: CreateOrdenDto,) {
    return this.ordenesService.CreateOrdenDto(dto);
  }

  @Get(':id')
  async findByClienteId(@Param('id') id: string) {
  const clienteId = parseInt(id);
    if (isNaN(clienteId)) {
      throw new BadRequestException('El parámetro "id" debe ser un número');
    }
    return this.ordenesService.findByClienteId(clienteId);
  }

  @Get('folio/:folio')
  async findByFolio(@Param('folio') folio: string) {
    return this.ordenesService.findByFolio(folio);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdeneDto: UpdateOrdeneDto) {
    return this.ordenesService.update(+id, updateOrdeneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(+id);
  }
}
