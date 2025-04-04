import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { ClienteResponseDto } from './dto/get-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}
  
  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<ClienteResponseDto> {
    const cliente = await this.clientRepository.findOne({
      where: { id },
      relations: ['direccion'],
    });
  
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }
  
    const direccion = cliente.direccion;
  
    return {
      id: cliente.id!,
      nombre: cliente.nombre!,
      apellido: cliente.apellido!,
      edad: Number(cliente.edad!),
      email: cliente.email!,
      fecha_registro: cliente.fecha_registro!,
      cliente_id: cliente.id!,
      calle: direccion?.calle ?? null,
      ciudad: direccion?.ciudad ?? null,
      codigo_postal: direccion?.codigo_postal ?? null,
    };
  }
  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
