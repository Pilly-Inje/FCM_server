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
exports.FcmController = void 0;
const common_1 = require("@nestjs/common");
const fcm_service_1 = require("./fcm.service");
let FcmController = class FcmController {
    fcmService;
    constructor(fcmService) {
        this.fcmService = fcmService;
    }
    async sendPush(body) {
        const { token, title, message } = body;
        const messageId = await this.fcmService.sendPushNotification(token, title, message);
        return { messageId };
    }
    async getAllTokens() {
        return await this.fcmService.getAllTokens();
    }
};
exports.FcmController = FcmController;
__decorate([
    (0, common_1.Post)('push'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FcmController.prototype, "sendPush", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FcmController.prototype, "getAllTokens", null);
exports.FcmController = FcmController = __decorate([
    (0, common_1.Controller)('fcm'),
    __metadata("design:paramtypes", [fcm_service_1.FcmService])
], FcmController);
//# sourceMappingURL=fcm.controller.js.map