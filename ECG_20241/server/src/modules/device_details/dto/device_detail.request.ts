import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class DeviceDetailRequest {
  @ApiProperty({
    description: "The unique identifier for the device detail",
    example: "987e6543-a21b-23d5-f456-5566b87741233",
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "The unique identifier for the device",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsUUID()
  device_id: string;

  @ApiProperty({
    description: "The name of the detail",
    example: "ECG",
  })
  @IsNotEmpty()
  detail_name: string;

  @ApiProperty({
    description: "The type of the detail",
    example: "1",
  })
  @IsNotEmpty()
  detail_type: number;

  @ApiProperty({
    description: "The value of the detail",
    example: "100",
  })
  value: string;

  @ApiProperty({
    description: "The information of the detail",
    example: "Here is the information of this detail",
  })
  information: string;
}
