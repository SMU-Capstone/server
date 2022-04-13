import { PartialType } from "@nestjs/mapped-types";
import { CreateTrashcanDto } from "./create-trashcan.dto";

export class UpdateTrashcanDto extends PartialType(CreateTrashcanDto) {}