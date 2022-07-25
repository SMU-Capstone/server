import { PickType } from '@nestjs/swagger'
import { Trashcan } from '../../entities/Trashcan'
import { IsIn, IsLatitude, IsLongitude, IsNumber } from 'class-validator';
export class CreateTrashcanDto extends PickType(Trashcan, [
    'type',
    'address',
    'latitude',
    'longitude',
] as const) {
    @IsNumber()
    @IsIn([1,2])
    type: number;

    @IsNumber()
    @IsLatitude()
    latitude: number;

    @IsNumber()
    @IsLongitude()
    longitude: number;

    @IsNumber()
    @IsIn([1,2,3])
    note: number;
}