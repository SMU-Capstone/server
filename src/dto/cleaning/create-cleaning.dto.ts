import { PickType } from "@nestjs/swagger"
import { IsIn, IsNumber } from "class-validator"
import { Cleaning } from "../../entities/Cleaning"

export class CreateCleaningDto extends PickType(Cleaning, [
    'note',
    'trashcanId',
] as const) {
    @IsNumber()
    @IsIn([1,2,3])
    note: number;

    @IsNumber()
    trashcanId: number;
}