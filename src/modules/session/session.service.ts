import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SessionDto } from './signup.dto';

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: SessionDto) {
    if (!email || !password) {
      throw new HttpException(
        'Dados inválidos, necessário enviar {email}, {password}',
        400,
      );
    }

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      token,
    };
  }
}
