import { Module } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { DireccionesController } from './direcciones.controller';
import { DireccionEntity } from './entities/direccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DireccionEntity, ClientEntity])],
  controllers: [DireccionesController],
  providers: [DireccionesService],
})
export class DireccionesModule {}
