import { PickType } from "@nestjs/swagger"
import { IsNumber } from "class-validator"
import { TrashcanFullLog } from "entities/TrashcanFullLog";

export class CreateTrashcanFullLogDto extends PickType(TrashcanFullLog, [
    'trashcanId',
] as const) {
    @IsNumber()
    trashcanId: number;
}