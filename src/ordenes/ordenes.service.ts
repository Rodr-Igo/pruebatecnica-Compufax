import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { OrdenEntity  } from 'src/ordenes/entities/ordene.entity';
import { OrdenResponseDto  } from './dto/orden-response.dto';
import { CreateOrdenDto } from './dto/create-orden.dto';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(OrdenEntity)
    private readonly ordenRepository: Repository<OrdenEntity>,
  ) {}

  async findAll(): Promise<OrdenResponseDto[]> {
    try {
      const ordenes = await this.ordenRepository.find({
        relations: ['cliente'],
      });

      if (!ordenes || ordenes.length === 0) {
        throw new NotFoundException('No se encontraron órdenes registradas');
      }

      return ordenes.map((orden) => ({
        id: orden.id,
        cliente_id: orden.cliente?.id ?? null,
        producto: orden.producto,
        cantidad: orden.cantidad,
        fecha_pedido: orden.fecha_pedido ?? null,
        folio: orden.folio,
      }));
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      throw new InternalServerErrorException('Error al obtener órdenes');
    }
  }

  create(clienteId: number, dto: CreateOrdenDto){
    return `This action returns a #${clienteId} ordene`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordene`;
  }

  update(id: number, updateOrdeneDto: UpdateOrdeneDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }
}
