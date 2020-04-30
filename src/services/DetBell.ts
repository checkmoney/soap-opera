import * as jwt from 'jsonwebtoken';

// TODO: It is a fake client, rewrite it!
export class DetBell {
  constructor(private readonly appSecret: string) {}

  async pretend(userId: string): Promise<string> {
    const payload = { login: userId, isManager: false };

    return jwt.sign(payload, this.appSecret, { algorithm: 'HS256' });
  }
}
