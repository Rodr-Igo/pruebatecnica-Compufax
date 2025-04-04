
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv'
import { ClientEntity } from 'src/client/entities/client.entity'

config()

export const dataSourceOptions:DataSourceOptions={
    type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ClientEntity],
      //This should be false in production
      synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;