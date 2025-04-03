import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'DB/data-source'
import { ClientModule } from './client/client.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
