"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignGateWay = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let DesignGateWay = class DesignGateWay {
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('connected', socket.id);
        });
    }
    handleUpdateElementPosition(data) {
        console.log('Element position updated:', data);
        this.server.emit('design', data);
    }
    handleCursorMoved(data) {
        console.log('Cursor moved:', data);
        this.server.emit('cursorUpdated', data);
    }
};
exports.DesignGateWay = DesignGateWay;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DesignGateWay.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('design'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DesignGateWay.prototype, "handleUpdateElementPosition", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('cursorMoved'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DesignGateWay.prototype, "handleCursorMoved", null);
exports.DesignGateWay = DesignGateWay = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    })
], DesignGateWay);
//# sourceMappingURL=design.gateway.js.map