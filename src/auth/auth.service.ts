import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { TokenPayload } from './types/token-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Token functions
  async generateAccessToken(payload: TokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
    });
  }

  verifyAccessToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return false;
      }

      return false;
    }
  }

  decodeToken(token: string): TokenPayload {
    return this.jwtService.decode(token);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneOrFail({
      where: { email: loginDto.email },
    });

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = await this.generateAccessToken(payload);

    return {
      accessToken,
      user_id: user.id,
      name: user.name,
    };
  }
}
