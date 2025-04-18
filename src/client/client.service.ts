import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  
  async create(dto: CreateClientDto): Promise<{ success: string }> {
    try {
      const nuevoCliente = this.clientRepository.create(dto);
      nuevoCliente.fecha_registro = new Date();
      await this.clientRepository.save(nuevoCliente);
      return { success: 'cliente creado' };
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw new BadRequestException('No se pudo crear el cliente');
    }
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
      edad: cliente.edad!,
      email: cliente.email!,
      fecha_registro: new Date().toDateString(),
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
