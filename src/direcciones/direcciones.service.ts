import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDireccioneDto } from './dto/create-direccione.dto';
import { UpdateDireccioneDto } from './dto/update-direccione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DireccionEntity } from './entities/direccion.entity';
import { Repository } from 'typeorm';
import { DireccionResponseDto } from './dto/get-direccione.dto';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(DireccionEntity)
    private readonly direccionRepository: Repository<DireccionEntity>,
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
        calle: direccion.calle,
        ciudad: direccion.ciudad,
        codigo_postal: direccion.codigo_postal,
      }));
    } catch (error) {
      console.error('Error al obtener direcciones:', error);
      throw new InternalServerErrorException('Error al obtener direcciones');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} direccione`;
  }

  update(id: number, updateDireccioneDto: UpdateDireccioneDto) {
    return `This action updates a #${id} direccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} direccione`;
  }
}
