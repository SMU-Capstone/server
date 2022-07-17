import { PickType } from "@nestjs/swagger"
import { IsNumber } from "class-validator"
import { Cleaning } from "../../entities/Cleaning"

export class CreateCleaningDto extends PickType(Cleaning, [
    'note',
    'trashcanId',
] as const) {
    @IsNumber()
    note: number;

    @IsNumber()
    trashcanId: number;
}