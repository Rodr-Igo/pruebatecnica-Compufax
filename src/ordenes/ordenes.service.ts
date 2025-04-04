import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { OrdenEntity  } from 'src/ordenes/entities/ordene.entity';
import { OrdenResponseDto  } from './dto/orden-response.dto';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { randomBytes } from 'crypto';
import { ClientEntity } from 'src/client/entities/client.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(OrdenEntity)
    private readonly ordenRepository: Repository<OrdenEntity>,

    @InjectRepository(ClientEntity)
        private readonly clienteRepository: Repository<ClientEntity>,
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

  async findByFolio(folio: string): Promise<OrdenResponseDto[]> {
    try {
      const ordenes = await this.ordenRepository.find({
        where: { folio },
        relations: ['cliente'],
      });
  
      if (!ordenes || ordenes.length === 0) {
        throw new NotFoundException(`No se encontraron órdenes con el folio "${folio}"`);
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
      console.error('Error al obtener órdenes por folio:', error);
      throw new InternalServerErrorException('Error al obtener órdenes por folio');
    }
  }

  async CreateOrdenDto(dto: CreateOrdenDto): Promise<{ folio: string }> {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { id: dto.cliente_id },
      });
  
      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${dto.cliente_id} no encontrado`);
      }
  
      const folio = 'TEST' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
      const ordenes = dto.items.map((item) => {
        return this.ordenRepository.create({
          cliente: { id: dto.cliente_id },
          producto: item.producto,
          cantidad: item.cantidad,
          folio,
          fecha_pedido: new Date(),
        });
      });
  
      await this.ordenRepository.save(ordenes);
  
      return { folio };
    } catch (error) {
      console.error('Error al crear orden:', error);
      throw new InternalServerErrorException('Error al registrar la orden del cliente');
    }
  }

  update(id: number, updateOrdeneDto: UpdateOrdeneDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }
}
