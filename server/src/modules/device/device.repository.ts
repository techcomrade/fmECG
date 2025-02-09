import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DeviceModel } from "../../entities/device.model";
import { DeviceRequest } from "./dto/device.request";
import { DeviceResponse } from "./dto/device.response";
import { Op } from "sequelize";
import { UnassignDeviceRequest } from "./dto/unassignDevice.request";

@Injectable()
export class DeviceRepository {
  constructor(
    @InjectModel(DeviceModel)
    private deviceModel: typeof DeviceModel
  ) {}

  async add(device: DeviceRequest) {
    return await this.deviceModel.create({
      id: device.id,
      user_id: device.user_id,
      device_name: device.device_name,
      information: device.information ?? "",
      device_type_id: device.device_type_id,
      status_id: device.status_id,
      start_time: device.start_time ?? null,
      end_time: device.end_time ?? null,
    });
  }

  async getAllData(): Promise<DeviceResponse[]> {
    return await this.deviceModel.findAll();
  }

  async getUnassignedDevices(): Promise<DeviceResponse[]> {
    return await this.deviceModel.findAll({
      where: {
        status_id: { [Op.in]: [2, 3] },
      },
    });
  }

  async getAssignedDevices(): Promise<DeviceResponse[]> {
    return await this.deviceModel.findAll({
      where: {
        status_id: 1,
      },
    });
  }

  async getById(id: string): Promise<DeviceResponse> {
    return await this.deviceModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async getByUserId(user_id: string): Promise<DeviceResponse[]> {
    return await this.deviceModel.findAll({
      where: {
        user_id: user_id,
      },
    });
  }

  async getDeviceByDeviceName(device_name: string): Promise<DeviceResponse[]> {
    return await this.deviceModel.findAll({
      where: {
        device_name: device_name,
      },
    });
  }

  async updateById(device: DeviceRequest, id: string) {
    return await this.deviceModel.update(
      {
        user_id: device.user_id,
        device_name: device.device_name,
        information: device.information,
        device_type_id: device.device_type_id,
        status_id: device.status_id,
        start_time: device.start_time,
        end_time: device.end_time,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async unassignDevice(device: UnassignDeviceRequest, id: string) {
    return await this.deviceModel.update(
      {
        user_id: device.user_id,
        status_id: 2,
      },
      {
        where: { id: id },
      }
    );
  }

  async deleteById(id: string) {
    return await this.deviceModel.destroy({
      where: {
        id: id,
      },
    });
  }

  async getByDeviceType(id: string) {
    return await this.deviceModel.findOne({
      where: {
        device_type_id: id,
      },
    });
  }

  async countDevicesPerMonth(): Promise<any[]> {
    const [result, metadata] = await this.deviceModel.sequelize.query(
      "SELECT EXTRACT(MONTH FROM FROM_UNIXTIME(createdAt)) AS month, COUNT(*) AS device_count FROM devices GROUP BY month ORDER BY month"
    );
    return result;
  }
}
