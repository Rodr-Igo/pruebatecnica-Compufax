import { Module } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { DireccionesController } from './direcciones.controller';
import { DireccionEntity } from './entities/direccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DireccionEntity])],
  controllers: [DireccionesController],
  providers: [DireccionesService],
})
export class DireccionesModule {}
