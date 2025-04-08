import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

declare global {
  namespace Express {
    interface Request {
      CurrentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers?.authorization == undefined) {
      throw new UnauthorizedException('Token not avaliable');
    }

    const token = this.extractTokenFromHeader(req.headers?.authorization);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: 'CredPal12345',
      });

      const user = await this.userService.findOne(decoded?.id);

      req.CurrentUser = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(bearerToken: string): string | undefined {
    const [type, token] = bearerToken.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
