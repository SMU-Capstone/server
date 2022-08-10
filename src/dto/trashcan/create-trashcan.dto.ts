import { PickType } from '@nestjs/swagger'
import { Trashcan } from '../../entities/Trashcan'
import { IsIn, IsLatitude, IsLongitude, IsNumber, IsString } from 'class-validator';
export class CreateTrashcanDto extends PickType(Trashcan, [
    'type',
    'address',
    'latitude',
    'longitude',
] as const) {
    @IsNumber()
    @IsIn([1,2])
    type: number;

    @IsString()
    address: string;

    @IsNumber()
    @IsLatitude()
    latitude: number;

    @IsNumber()
    @IsLongitude()
    longitude: number;
}