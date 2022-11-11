import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/common/constants';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.ttdtt_web_token,
      ]),
      secretOrKey: JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
