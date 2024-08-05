import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { JamboardService } from './jamboard.service';
export declare class JamboardGateWay implements OnModuleInit {
    private readonly jamboardService;
    onModuleInit(): void;
    server: Server;
    constructor(jamboardService: JamboardService);
    handleStateUpdate(body: any): void;
    handleElementSizeChange(body: any): void;
    handleElementPositionChange(body: any): void;
    handleElementAppearanceChange(body: any): void;
    handleElementDataChange(body: any): void;
    handleElementInfoChange(body: any): void;
    handleCursorMove(body: any): void;
    handleActiveUsers(body: any): void;
}
