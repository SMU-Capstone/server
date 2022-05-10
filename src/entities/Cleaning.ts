import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";
import { Trashcan } from "./Trashcan";

@Index("fk_CLEANING_TRASHCAN_idx", ["trashcanId"], {})
@Entity("CLEANING", { schema: "mydb" })
export class Cleaning {
  @ApiProperty({
    description: '쓰레기통 청소 신청의 ID'
  })
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @ApiProperty({
    description: '정수형으로 표기된 사용자의 청소 신청 사유',
    example: '1'
  })
  @Column("int", { name: "NOTE" })
  note: number;

  @ApiProperty({
    description: '쓰레기통 청소 신청 생성 날짜',
    example: '2022-05-08 18:02:58'
  })
  @CreateDateColumn({
    type: "timestamp",
    name: "CREATED_AT",
    default: "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @ApiProperty({
    description: '쓰레기통 청소 신청 수정 날짜',
    example: '2022-05-08 18:02:58'
  })
  @UpdateDateColumn({
    type: "timestamp",
    name: "UPDATED_AT",
    default: "CURRENT_TIMESTAMP"
  })
  updatedAt: Date;

  @ApiProperty({
    description: '쓰레기통 청소 신청 삭제 날짜'
  })
  @DeleteDateColumn({
    type: "timestamp",
    name: "DELETED_AT",
    nullable: true,
    default: null
  })
  deletedAt: Date | null;

  @ApiProperty({
    description: '청소를 신청한 쓰레기통의 ID'
  })
  @Column("int", { name: "TRASHCAN_ID" })
  trashcanId: number;

  @ManyToOne(() => Trashcan, (trashcan) => trashcan.cleanings, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "TRASHCAN_ID", referencedColumnName: "id" }])
  trashcan: Trashcan;
}
