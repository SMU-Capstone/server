import { CreateMapDto } from '../../dto/map/create-map.dto';
import { UpdateMapDto } from '../../dto/map/update-map.dto';
export declare class MapService {
    create(createMapDto: CreateMapDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMapDto: UpdateMapDto): string;
    remove(id: number): string;
}
