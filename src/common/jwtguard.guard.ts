import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header missing");
    }

    const [type, Token] = authHeader.split(" ");

    if (type !== "Bearer" || !Token) {
      throw new UnauthorizedException("Invalid Token format");
    }

    try {
      const decoded = jwt.verify(
        Token,
        process.env.JWT_SECRET || "SECRET_KEY"
      );
      req.user = decoded;
      return true;
    } catch (err) {
      console.error("JWT ERROR:", err.message);
      throw new UnauthorizedException("Invalid or expired Token");
    }
  }
}