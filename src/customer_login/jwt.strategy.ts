import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: process.env.JWT_SECRET || "SECRET_KEY",
    });
  }

  async validate(payload: any) {
      console.log("JWT PAYLOAD:", payload);
    return { id: payload.id, email: payload.email };
  }
}