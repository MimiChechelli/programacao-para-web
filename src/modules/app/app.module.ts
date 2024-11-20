import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/env';
import { SessionModule } from '../session/session.module';
import { SignupModule } from '../signup/signup.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    SessionModule,
    SignupModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
