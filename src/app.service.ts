import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getSayHello(): string {
        return 'Hello everyone!';
    }
}
