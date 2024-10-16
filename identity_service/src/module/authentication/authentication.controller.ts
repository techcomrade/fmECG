import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication Controllers')
@Controller('authentication')
export class AuthenticationController {
  @Get('')
  findAll() {
    return 'ádfadsfdsf';
  }
}
