import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { UsersService } from './users.service';
export declare class UsersGateWay implements OnModuleInit {
    private readonly usersService;
    onModuleInit(): void;
    server: Server;
    constructor(usersService: UsersService);
    handleStateUpdate(body: any): void;
}
