import { DeviceRepository } from './model/device.repository';
import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceService } from './device.service';
import { DeviceModel } from './model/device.model';

@Module({
    imports: [
        SequelizeModule.forFeature([DeviceModel]),
    ],
    controllers: [DeviceController],
    providers: [DeviceService, DeviceRepository],
    exports: [DeviceService]
})

export class DeviceModule {}