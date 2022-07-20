import { PickType } from "@nestjs/swagger"
import { IsIn, IsLatitude, IsLongitude, IsNumber } from "class-validator";
import { Application } from "../../entities/Application"

export class CreateApplicationDto extends PickType(Application, [
    'type',
    'latitude',
    'longitude',
    'note',
] as const){
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