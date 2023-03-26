import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await ormconfig, {
          autoLoadEntities: true,
        }),
    }),
  ],
})
export class DatabaseModule {}
