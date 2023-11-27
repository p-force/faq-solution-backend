import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'src/datasource';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [],
  providers: [],
})
export class DbModule {}
