import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { PayloadModel } from './dto/payload.model';

@Injectable()
export class TokenService {
  private privateKey: Buffer;
  private publicKey: Buffer;
  constructor(private readonly tokenRepository: TokenRepository) {
    this.privateKey = fs.readFileSync('key/private-key.pem');
    this.publicKey = fs.readFileSync('key/public-key.pem');
  }

  public renderToken(payload: PayloadModel, time: string): string {
    const token = jwt.sign(payload, this.privateKey, {
      algorithm: 'RS256',
      expiresIn: time,
    });
    return token;
  }
  public decodeToken(token: string): any {
    jwt.verify(
      token,
      this.publicKey,
      { algorithms: ['RS256'] },
      (err, decoded) => {
        if (err) {
          console.error('Token is invalid or expired:', err.message);
          return null;
        } else {
          console.log('Token is valid:', decoded);
          return decoded;
        }
      },
    );
    return false;
  }
}
