import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class DeviceRequest {
  @ApiProperty({
    description: "The unique identifier for the device",
    example: "987e6543-a21b-23d5-f456-5566b87741233",
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "The unique identifier for the user",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsUUID()
  doctor_id: string;

  @ApiProperty({
    description: "The unique identifier for the device",
    example: "ECG",
  })
  @IsNotEmpty()
  device_name: string;

  @ApiProperty({
    description: "The unique identifier for the device",
    example: "Here is the information of this device",
  })
  information: string;

  @ApiProperty({
    description: "The unique identifier for the device type",
    example: 1,
  })
  @IsNotEmpty()
  device_type_id: number;

  @ApiProperty({
    description: "The unique identifier for the device status",
    example: 1,
  })
  @IsNotEmpty()
  status_id: number;
}
