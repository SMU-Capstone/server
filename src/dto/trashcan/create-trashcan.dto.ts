import { PickType } from '@nestjs/swagger'
import { Trashcan } from '../../entities/Trashcan'
import { IsNumber, IsString } from 'class-validator';
export class CreateTrashcanDto extends PickType(Trashcan, [
    'type',
    'address',
    'latitude',
    'longitude',
] as const) {
    @IsNumber()
    type: number;

    @IsString() 
    latitude: number;

    @IsString()
    longitude: number;

    @IsNumber()
    note: number;
}