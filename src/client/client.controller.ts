import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClienteResponseDto } from './dto/get-client.dto';

@Controller('clientes')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() dto: CreateClientDto) {
    return await this.clientService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ClienteResponseDto> {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
