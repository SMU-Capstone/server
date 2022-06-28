import { PickType } from "@nestjs/swagger"
import { Application } from "../../entities/Application"

export class CreateApplicationDto extends PickType(Application, [
    'type',
    'latitude',
    'longitude',
    'note',
] as const){}