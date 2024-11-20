import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    title: 'Email',
    description: 'Email do usuário',
    type: String,
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    title: 'Password',
    description: 'Password do usuário',
    type: String,
    example: '123456',
  })
  password: string;

  @ApiProperty({
    title: 'Nome',
    description: 'Nome do usuário',
    type: String,
    example: 'John Doe',
  })
  name: string;
}
