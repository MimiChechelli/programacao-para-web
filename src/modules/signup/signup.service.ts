import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './signup.dto';

export interface SignupInterface {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class SignupService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup({ email, name, password }: SignupDto) {
    if (!email || !name || !password) {
      throw new HttpException(
        'Dados inválidos, necessário enviar {email}, {name}, {password}',
        400,
      );
    }

    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (user) {
      throw new HttpException('Usuário com e-mail já cadastrado', 409);
    }

    const encryptedPassword = await bcrypt.hash(password, 8);
    return await this.prismaService.user.create({
      data: {
        email,
        name,
        password: encryptedPassword,
      },
    });
  }
}
