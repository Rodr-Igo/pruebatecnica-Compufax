import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDireccioneDto } from './dto/create-direccione.dto';
import { UpdateDireccioneDto } from './dto/update-direccione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DireccionEntity } from './entities/direccion.entity';
import { Repository } from 'typeorm';
import { DireccionResponseDto } from './dto/get-direccione.dto';
import { ClientEntity } from 'src/client/entities/client.entity';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(DireccionEntity)
    private readonly direccionRepository: Repository<DireccionEntity>,
    
    @InjectRepository(ClientEntity)
    private readonly clienteRepository: Repository<ClientEntity>,
  ) {}
  create(createDireccioneDto: CreateDireccioneDto) {
    return 'This action adds a new direccione';
  }

  async findAll(): Promise<DireccionResponseDto[]> {
    try {
      const direcciones = await this.direccionRepository.find({
        relations: ['cliente'],
      });

      if (!direcciones || direcciones.length === 0) {
        throw new NotFoundException('No se encontraron direcciones registradas');
      }

      return direcciones.map((direccion) => ({
        id: direccion.id,
        cliente_id: direccion.cliente?.id ?? null,
      nombre_cliente: direccion.cliente?.nombre ?? null,
        calle: direccion.calle,
        ciudad: direccion.ciudad,
        codigo_postal: direccion.codigo_postal,
      }));
    } catch (error) {
      console.error('Error al obtener direcciones:', error);
      throw new InternalServerErrorException('Error al obtener direcciones');
    }
  }

  async findOne(id: number): Promise<DireccionResponseDto> {
    try {
      const direccion = await this.direccionRepository.findOne({
        where: { id },
        relations: ['cliente'],
      });
  
      if (!direccion || !direccion.cliente) {
        throw new NotFoundException(`Dirección con ID ${id} no encontrada o no tiene cliente asociado`);
      }
  
      return {
        id: direccion.id,
        cliente_id: direccion.cliente?.id!,
        nombre_cliente: direccion.cliente.nombre!,
        calle: direccion.calle,
        ciudad: direccion.ciudad,
        codigo_postal: direccion.codigo_postal,
      };
    } catch (error) {
      console.error('Error al buscar dirección:', error);
      throw new InternalServerErrorException('Error al buscar la dirección');
    }
  }

  //Este lo nombre update por 
  async updateDireccionByClienteId(
    clienteId: number,
    dto: UpdateDireccioneDto,
  ): Promise<{
    message: string;
    data: DireccionResponseDto;
  }> {
    try {
      // Verifica que el cliente exista
      const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
  
      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
      }
  
      // Busca si ya tiene dirección
      let direccion = await this.direccionRepository.findOne({
        where: { cliente: { id: clienteId } },
        relations: ['cliente'],
      });
  
      if (direccion) {
        // Actualiza
        direccion.calle = dto.calle;
        direccion.ciudad = dto.ciudad;
        direccion.codigo_postal = dto.codigo_postal;
      } else {
        // Crea nueva dirección
        direccion = this.direccionRepository.create({
          ...dto,
          cliente,
        });
      }
  
      const saved = await this.direccionRepository.save(direccion);
  
      return {
        message: 'Dirección actualizada correctamente',
        data: {
          id: saved.id,
          cliente_id: saved.cliente.id!,
          nombre_cliente: direccion.cliente.nombre!,
          calle: saved.calle,
          ciudad: saved.ciudad,
          codigo_postal: saved.codigo_postal,
        },
      };
    } catch (error) {
      console.error('Error al actualizar dirección:', error);
      throw new InternalServerErrorException('Error al actualizar la dirección');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} direccione`;
  }
}
