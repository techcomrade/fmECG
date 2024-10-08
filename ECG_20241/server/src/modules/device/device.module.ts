import { DeviceRepository } from './device.repository';
import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceService } from './device.service';
import { DeviceModel } from '../../entities/device.model';
import { DeviceStatusModel } from '../../entities/device_status.model';
import { DeviceTypeModel } from '../../entities/device_type.model';

@Module({
    imports: [
        SequelizeModule.forFeature([DeviceModel, DeviceStatusModel, DeviceTypeModel]),
    ],
    controllers: [DeviceController],
    providers: [DeviceService, DeviceRepository],
    exports: [DeviceService]
})

export class DeviceModule {}