import { PickType } from "@nestjs/swagger"
import { Cleaning } from "../../entities/Cleaning"

export class CreateCleaningDto extends PickType(Cleaning, [
    'note',
    'trashcanId',
] as const) {}