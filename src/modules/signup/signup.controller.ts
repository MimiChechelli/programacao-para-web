import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './signup.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  signup(@Body() body: SignupDto) {
    return this.signupService.signup({ ...body });
  }
}
