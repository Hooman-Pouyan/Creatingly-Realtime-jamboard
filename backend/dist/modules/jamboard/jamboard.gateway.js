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
exports.JamboardGateWay = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const events_model_1 = require("../../core/models/events.model");
const jamboard_service_1 = require("./jamboard.service");
let JamboardGateWay = class JamboardGateWay {
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('connected', socket.id);
        });
    }
    constructor(jamboardService) {
        this.jamboardService = jamboardService;
    }
    handleStateUpdate(body) {
        this.jamboardService.handleStateUpdate(body);
    }
    handleElementSizeChange(body) {
        this.server.emit(events_model_1.SocketEvents.JAMBOARD.ELEMENT.SIZE, body);
    }
    handleElementPositionChange(body) {
        this.server.emit(events_model_1.SocketEvents.JAMBOARD.ELEMENT.POSITION, {
            id: body[0],
            event: events_model_1.SocketEvents.JAMBOARD.ELEMENT.POSITION,
            data: body[1],
        });
        this.jamboardService.handleElementPositionChange(body);
    }
    handleElementAppearanceChange(body) {
        console.log(body);
        this.server.emit('jamboard:element', {
            event: 'jamboard:element',
            id: body[0],
            type: body[1],
            data: body[2],
        });
    }
    handleElementDataChange(body) {
        this.server.emit(events_model_1.SocketEvents.JAMBOARD.ELEMENT.DATA, body);
        this.jamboardService.handleElementDataChange(body);
    }
    handleElementInfoChange(body) {
        this.server.emit(events_model_1.SocketEvents.JAMBOARD.ELEMENT.INFO, body);
        this.jamboardService.handleElementInfoChange(body);
    }
    handleCursorMove(body) {
        this.server.emit(events_model_1.SocketEvents.JAMBOARD.CURSOR.MOVE, body);
        this.jamboardService.handleCursorMove(body);
    }
    handleActiveUsers(body) {
        this.server.emit(events_model_1.SocketEvents.JAMBOARD.USERS.LOGIN, body);
        this.jamboardService.handleActiveUsers(body);
    }
};
exports.JamboardGateWay = JamboardGateWay;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], JamboardGateWay.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_model_1.SocketEvents.JAMBOARD.STATE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JamboardGateWay.prototype, "handleStateUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_model_1.SocketEvents.JAMBOARD.ELEMENT.SIZE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JamboardGateWay.prototype, "handleElementSizeChange", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_model_1.SocketEvents.JAMBOARD.ELEMENT.POSITION),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JamboardGateWay.prototype, "handleElementPositionChange", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('jamboard:element'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JamboardGateWay.prototype, "handleElementAppearanceChange", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_model_1.SocketEvents.JAMBOARD.ELEMENT.DATA),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JamboardGateWay.prototype, "handleElementDataChange", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_model_1.SocketEvents.JAMBOARD.ELEMENT.INFO),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JamboardGateWay.prototype, "handleElementInfoChange", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_model_1.SocketEvents.JAMBOARD.CURSOR.MOVE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JamboardGateWay.prototype, "handleCursorMove", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_model_1.SocketEvents.JAMBOARD.USERS.LOGIN),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JamboardGateWay.prototype, "handleActiveUsers", null);
exports.JamboardGateWay = JamboardGateWay = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    }),
    __metadata("design:paramtypes", [jamboard_service_1.JamboardService])
], JamboardGateWay);
//# sourceMappingURL=jamboard.gateway.js.map