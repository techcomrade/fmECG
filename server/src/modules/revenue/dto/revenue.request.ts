
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  IsInt,
} from "class-validator";

export class RevenueRequest {
  @ApiProperty({
    description: "The unique identifier for the revenue record",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "The unique identifier for the schedule",
    example: "234e5678-f89a-34d7-b456-123d89653000",
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  schedule_id: string;

    @ApiProperty({
      description: "Type ID of the schedule",
      example: 1,
    })
    @IsNotEmpty()
    @IsUUID()
    schedule_type: number;

  @ApiProperty({
    description: "The unique identifier for the user (patient)",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  patient_id: string;

  @ApiProperty({
    description: "The unique identifier for the user (doctor)",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  doctor_id?: string;

  @ApiProperty({
    description: "Type of the service",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  serviceType: number;

  @ApiProperty({
    description: "Fee associated with the service",
    example: 500.0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  fee: number;
}