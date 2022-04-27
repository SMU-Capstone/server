import { PickType } from '@nestjs/swagger'
import { Trashcan } from '../../entities/Trashcan'

export class CreateTrashcanDto extends PickType(Trashcan, [
    'type',
    'address',
    'x',
    'y',
] as const) {}