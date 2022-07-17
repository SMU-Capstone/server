import { PickType } from "@nestjs/swagger"
import { IsNumber } from "class-validator";
import { Application } from "../../entities/Application"

export class CreateApplicationDto extends PickType(Application, [
    'type',
    'latitude',
    'longitude',
    'note',
] as const){
    @IsNumber()
    type: number;

    @IsNumber() 
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsNumber()
    note: number;
}