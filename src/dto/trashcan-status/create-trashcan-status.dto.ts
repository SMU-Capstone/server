import { PickType } from "@nestjs/swagger"
import { IsIn, IsNumber } from "class-validator"
import { TrashcanStatus } from "entities/TrashcanStatus";

export class CreateTrashcanStatusDto extends PickType(TrashcanStatus, [
    'isFull',
    'trashcanId',
] as const) {
    @IsNumber()
    @IsIn([0,1])
    isFull: number;

    @IsNumber()
    trashcanId: number;
}