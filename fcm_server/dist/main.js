"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('SERVER_PORT', 3001);
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map