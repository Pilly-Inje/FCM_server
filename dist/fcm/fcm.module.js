"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmModule = void 0;
const common_1 = require("@nestjs/common");
const fcm_service_1 = require("./fcm.service");
const fcm_controller_1 = require("./fcm.controller");
const bull_1 = require("@nestjs/bull");
const fcm_processer_1 = require("./fcm.processer");
const fcm_repository_1 = require("./fcm.repository");
const typeorm_1 = require("@nestjs/typeorm");
const fcm_entity_1 = require("./fcm.entity");
let FcmModule = class FcmModule {
};
exports.FcmModule = FcmModule;
exports.FcmModule = FcmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'alarm',
            }),
            typeorm_1.TypeOrmModule.forFeature([fcm_entity_1.FcmTokenEntity])
        ],
        controllers: [fcm_controller_1.FcmController],
        providers: [
            fcm_service_1.FcmService,
            fcm_processer_1.FcmProcessor,
            fcm_repository_1.FcmRepository,
        ],
        exports: [fcm_repository_1.FcmRepository],
    })
], FcmModule);
//# sourceMappingURL=fcm.module.js.map