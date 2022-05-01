import { PickType } from "@nestjs/swagger"
import { Application } from "../../entities/Application"

export class CreateApplicationDto extends PickType(Application, [
    'type',
    'x',
    'y',
    'note',
] as const){}