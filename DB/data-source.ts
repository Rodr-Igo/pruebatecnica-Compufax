
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions:DataSourceOptions={
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pruebacompufax',
      entities: [],
      //This should be false in production
      synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;