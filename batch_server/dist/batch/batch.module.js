"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bull_1 = require("@nestjs/bull");
const batch_service_1 = require("./batch.service");
const axios_1 = require("@nestjs/axios");
let BatchModule = class BatchModule {
};
exports.BatchModule = BatchModule;
exports.BatchModule = BatchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            bull_1.BullModule.registerQueue({
                name: 'alarm',
            }),
            axios_1.HttpModule,
        ],
        providers: [batch_service_1.BatchService]
    })
], BatchModule);
//# sourceMappingURL=batch.module.js.map