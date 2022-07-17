import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("APPLICATION", { schema: "mydb" })
export class Application {
  @ApiProperty({
    description: '쓰레기통 신규 신청 ID'
  })
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @ApiProperty({
    description: '정수형으로 표기된 쓰레기통 타입 (1: 일반쓰레기, 2: 재활용)',
    example: '1'
  })
  @Column("int", { name: "TYPE" })
  type: number;

  @ApiProperty({
    description: '현재 사용자의 위도',
    example: '37.576004'
  })
  @Column("decimal", { name: "LATITUDE", precision: 9, scale: 6 })
  latitude: number;

  @ApiProperty({
    description: '현재 사용자의 경도',
    example: '126.971748'
  })
  @Column("decimal", { name: "LONGITUDE", precision: 9, scale: 6 })
  longitude: number;

  @ApiProperty({
    description: '정수형으로 표기된 사용자의 요청 사유'
  })
  @Column("int", { name: "NOTE" })
  note: number;

  @ApiProperty({
    description: '쓰레기통 신규 신청 날짜',
    example: '2022-05-08 18:02:58'
  })
  @CreateDateColumn({
    type: "timestamp",
    name: "CREATED_AT",
    default: "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @ApiProperty({
    description: '쓰레기통 신청 수정 날짜',
    example: '2022-05-08 18:02:58'
  })
  @UpdateDateColumn({
    type: "timestamp",
    name: "UPDATED_AT",
    default: "CURRENT_TIMESTAMP"
  })
  updatedAt: Date;

  @ApiProperty({
    description: '쓰레기통 신청 삭제 날짜'
  })
  @DeleteDateColumn({
    type: "timestamp",
    name: "DELETED_AT",
    nullable: true,
    default: null
  })
  deletedAt: Date | null;
}