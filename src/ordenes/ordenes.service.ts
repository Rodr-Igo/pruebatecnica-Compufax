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
        nombre_cliente: orden.cliente?.nombre ?? '',
        apellido_cliente: orden.cliente?.apellido ?? '',
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

  async findByClienteId(clienteId: number): Promise<OrdenResponseDto[]> {
    try {
      const ordenes = await this.ordenRepository.find({
        where: { cliente: { id: clienteId } },
        relations: ['cliente'],
      });
  
      if (!ordenes || ordenes.length === 0) {
        throw new NotFoundException(`No se encontraron órdenes para el cliente con ID ${clienteId}`);
      }
  
      return ordenes.map((orden) => ({
        id: orden.id,
        cliente_id: orden.cliente?.id ?? null,
        nombre_cliente: orden.cliente?.nombre ?? '',
        apellido_cliente: orden.cliente?.apellido ?? '',
        producto: orden.producto,
        cantidad: orden.cantidad,
        fecha_pedido: orden.fecha_pedido ?? null,
        folio: orden.folio,
      }));
    } catch (error) {
      console.error('Error al buscar órdenes por cliente:', error);
      throw new InternalServerErrorException('Error al obtener las órdenes del cliente');
    }
  }

  create(clienteId: number, dto: CreateOrdenDto){
    return `This action returns a #${clienteId} ordene`;
  }

  update(id: number, updateOrdeneDto: UpdateOrdeneDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }
}
