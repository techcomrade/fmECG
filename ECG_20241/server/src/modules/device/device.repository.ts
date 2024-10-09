import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DeviceModel } from "../../entities/device.model";

@Injectable()
export class DeviceRepository {
  constructor(
    @InjectModel(DeviceModel)
    private deviceModel: typeof DeviceModel
  ) {}

  async getAllData(): Promise<DeviceModel[]> {
    return await this.deviceModel.findAll();
  }

  async add(device: DeviceModel) {
    try {
      return await this.deviceModel.create({
        id: device.id,
        doctor_id: device.doctor_id,
        device_name: device.device_name,
        information: device.information ?? "",
        device_type: device.device_type,
        start_date: device.start_date,
        status: device.status,
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  async updateById(device: DeviceModel, id: string) {
    return await this.deviceModel.update(
      {
        doctor_id: device.doctor_id,
        device_name: device.device_name,
        information: device.information,
        device_type_id: device.device_type_id,
        start_date: device.start_date,
        status_id: device.status_id,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async getById(id: string): Promise<DeviceModel> {
    return await this.deviceModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async getByUserId(doctor_id: string): Promise<DeviceModel[]> {
    return await this.deviceModel.findAll({
      where: {
        doctor_id: doctor_id,
      },
    });
  }

  async getByDoctorId(doctor_id: string): Promise<DeviceModel[]> {
    return await this.deviceModel.findAll({
      where: {
        doctor_id: doctor_id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.deviceModel.destroy({
      where: {
        id: id,
      },
    });
  }
}
