import { Controller, Get } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
  @Get('')
  findAll() {
    return 'ádfadsfdsf';
  }
}
