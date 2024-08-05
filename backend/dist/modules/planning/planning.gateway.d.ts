import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
export declare class PlanningGateWay implements OnModuleInit {
    onModuleInit(): void;
    server: Server;
    handleUpdateElementPosition(data: any): void;
    handleCursorMoved(data: any): void;
}
