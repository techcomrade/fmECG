// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/sequelize";
// import { DeviceModel } from "../../entities/device.model";
// import { Device } from "./interfaces/device.interface";

// @Injectable()
// export class DeviceRepository {
//   constructor(
//     @InjectModel(DeviceModel)
//     private deviceModel: typeof DeviceModel
//   ) {}

//   async getAllData(): Promise<DeviceModel[]> {
//     return await this.deviceModel.findAll();
//   }

//   async add(device: Device) {
//     return await this.deviceModel.create({
//       id: device.id,
//       user_id: device.user_id,
//       doctor_id: device.doctor_id,
//       device_name: device.device_name,
//       information: device.information ?? "",
//       device_type: device.device_type,
//       start_date: device.start_date,
//       status: device.status,
//     });
//   }

//   async updateById(device: Device, id: string) {
//     return await this.deviceModel.update(
//       {
//         user_id: device.user_id,
//         doctor_id: device.doctor_id,
//         device_name: device.device_name,
//         information: device.information,
//         device_type: device.device_type,
//         start_date: device.start_date,
//         status: device.status,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );
//   }

//   async getById(id: string): Promise<Device> {
//     return await this.deviceModel.findOne({
//       where: {
//         id: id,
//       },
//     });
//   }

//   async getByUserId(user_id: string): Promise<Device[]> {
//     return await this.deviceModel.findAll({
//       where: {
//         user_id: user_id,
//       },
//     });
//   }

//   async getByDoctorId(doctor_id: string): Promise<Device[]> {
//     return await this.deviceModel.findAll({
//       where: {
//         doctor_id: doctor_id,
//       },
//     });
//   }

//   async deleteById(id: string) {
//     return await this.deviceModel.destroy({
//       where: {
//         id: id,
//       },
//     });
//   }
// }
