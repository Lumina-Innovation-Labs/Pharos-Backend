import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  get jwtConstants() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      access_token_expiration_time: this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
      refresh_token_expiration_time: this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      ),
    };
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };

    const access_token = await this.jwtService.sign(payload, {
      secret: this.jwtConstants.secret,
      expiresIn: this.jwtConstants.access_token_expiration_time,
    });

    const refresh_token = await this.jwtService.sign(payload, {
      secret: this.jwtConstants.secret,
      expiresIn: this.jwtConstants.refresh_token_expiration_time,
    });

    return { access_token, refresh_token };
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ new_access_token: string }> {
    const { refresh_token } = refreshTokenDto;
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: this.jwtConstants.secret,
      });

      const new_access_token = await this.jwtService.sign(payload, {
        secret: this.jwtConstants.secret,
        expiresIn: this.jwtConstants.access_token_expiration_time,
      });

      return { new_access_token };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
