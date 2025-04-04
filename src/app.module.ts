import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'DB/data-source'
import { ClientModule } from './client/client.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { OrdenesModule } from './ordenes/ordenes.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ClientModule, DireccionesModule, OrdenesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
