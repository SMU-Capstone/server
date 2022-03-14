import { MapService } from './map.service';
import { CreateMapDto } from '../../dto/map/create-map.dto';
import { UpdateMapDto } from '../../dto/map/update-map.dto';
export declare class MapController {
    private readonly mapService;
    constructor(mapService: MapService);
    create(createMapDto: CreateMapDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMapDto: UpdateMapDto): string;
    remove(id: string): string;
}
