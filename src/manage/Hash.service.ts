import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HashService {
  generateSha256Hash(data: string): string {
    const sha256Hash = crypto.createHash('sha256');
    sha256Hash.update(data);
    return sha256Hash.digest('hex'); // SHA-256 해시 값을 16진수 문자열로 반환
  }
}
