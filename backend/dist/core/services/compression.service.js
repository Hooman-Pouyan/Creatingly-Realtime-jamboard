"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionService = void 0;
const common_1 = require("@nestjs/common");
const pako_1 = require("pako");
let CompressionService = class CompressionService {
    compress(data) {
        return JSON.stringify((0, pako_1.deflate)(JSON.stringify(data)));
    }
    decompress(data) {
        console.log(JSON.parse(JSON.stringify((0, pako_1.inflate)(data))));
        return JSON.parse(JSON.stringify((0, pako_1.inflate)(data)));
    }
};
exports.CompressionService = CompressionService;
exports.CompressionService = CompressionService = __decorate([
    (0, common_1.Injectable)()
], CompressionService);
//# sourceMappingURL=compression.service.js.map