import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,Entity, OneToMany } from "typeorm";
import { Cleaning } from "./Cleaning";
import { TrashcanStatus } from "./TrashcanStatus";

@Entity("TRASHCAN", { schema: "mydb" })
export class Trashcan {
  @ApiProperty({
    description: '쓰레기통 ID'
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
    description: '쓰레기통의 주소',
    example: '경복궁역 4번 출구'
  })
  @Column("varchar", { name: "ADDRESS", length: 45 })
  address: string;

  @ApiProperty({
    description: '쓰레기통의 위도',
    example: '37.576004'
  })
  @Column("decimal", { name: "LATITUDE", precision: 9, scale: 6 })
  latitude: number;

  @ApiProperty({
    description: '쓰레기통의 경도',
    example: '126.971748'
  })
  @Column("decimal", { name: "LONGITUDE", precision: 9, scale: 6 })
  longitude: number;

  @ApiProperty({
    description: '쓰레기통 정보 생성 날짜'
  })
  @CreateDateColumn({
    type: "timestamp",
    name: "CREATED_AT",
    default: "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @ApiProperty({
    description: '쓰레기통 정보 최근 수정 날짜'
  })
  @UpdateDateColumn({
    type: "timestamp",
    name:"UPDATED_AT",
    default: "CURRENT_TIMESTAMP"
  })
  updatedAt: Date;

  @ApiProperty({
    description: '쓰레기통 정보 삭제 날짜'
  })
  @DeleteDateColumn({
    type: "timestamp",
    name: "DELETED_AT",
    nullable: true,
    default: null
  })
  deletedAt: Date | null;

  @OneToMany(() => Cleaning, (cleaning) => cleaning.trashcan)
  cleanings: Cleaning[];

  @OneToMany(() => TrashcanStatus, (trashcanStatus) => trashcanStatus.trashcan)
  trashcanStatuses: TrashcanStatus[];
}
