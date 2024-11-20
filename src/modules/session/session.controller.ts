import { Body, Controller, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionDto } from './signup.dto';

@Controller('/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async login(@Body() body: SessionDto) {
    return await this.sessionService.login({ ...body });
  }
}
