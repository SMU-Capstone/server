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
exports.MapController = void 0;
const common_1 = require("@nestjs/common");
const map_service_1 = require("./map.service");
const create_map_dto_1 = require("../../dto/map/create-map.dto");
const update_map_dto_1 = require("../../dto/map/update-map.dto");
let MapController = class MapController {
    constructor(mapService) {
        this.mapService = mapService;
    }
    create(createMapDto) {
        return this.mapService.create(createMapDto);
    }
    findAll() {
        return this.mapService.findAll();
    }
    findOne(id) {
        return this.mapService.findOne(+id);
    }
    update(id, updateMapDto) {
        return this.mapService.update(+id, updateMapDto);
    }
    remove(id) {
        return this.mapService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_map_dto_1.CreateMapDto]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MapController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_map_dto_1.UpdateMapDto]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MapController.prototype, "remove", null);
MapController = __decorate([
    (0, common_1.Controller)('map'),
    __metadata("design:paramtypes", [map_service_1.MapService])
], MapController);
exports.MapController = MapController;
//# sourceMappingURL=map.controller.js.map