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
  async create(
    @Query('id') id: string,
    @Body() dto: CreateOrdenDto,
  ) {
    const clienteId = parseInt(id);
    if (isNaN(clienteId)) {
      throw new BadRequestException('El parámetro "id" debe ser un número');
    }
  
    return this.ordenesService.create(clienteId, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(+id);
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
