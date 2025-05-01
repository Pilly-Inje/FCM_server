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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmTokenEntity = void 0;
const typeorm_1 = require("typeorm");
let FcmTokenEntity = class FcmTokenEntity {
    id;
    userid;
    token;
    platform;
    isActive;
    createdAt;
    updatedAt;
};
exports.FcmTokenEntity = FcmTokenEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FcmTokenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], FcmTokenEntity.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 512, unique: true }),
    __metadata("design:type", String)
], FcmTokenEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], FcmTokenEntity.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], FcmTokenEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'craeted_at' }),
    __metadata("design:type", Date)
], FcmTokenEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], FcmTokenEntity.prototype, "updatedAt", void 0);
exports.FcmTokenEntity = FcmTokenEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'pilly_token' }),
    (0, typeorm_1.Unique)(['token'])
], FcmTokenEntity);
//# sourceMappingURL=fcm.entity.js.map