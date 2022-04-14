import { PartialType } from "@nestjs/mapped-types";
import { CreateCleaningDto } from "./create-cleaning.dto";

export class UpdateCleaningDto extends PartialType(CreateCleaningDto) {}