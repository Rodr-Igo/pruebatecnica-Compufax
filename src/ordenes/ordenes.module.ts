import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { OrdenEntity } from './entities/ordene.entity';
import { ClientEntity } from 'src/client/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenEntity,ClientEntity]),],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}
