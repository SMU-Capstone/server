import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,Entity, OneToMany } from "typeorm";
import { Cleaning } from "./Cleaning";

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
    description: '쓰레기통의 X 좌표',
    example: '37.576004'
  })
  @Column("decimal", { name: "X", precision: 9, scale: 6 })
  x: string;

  @ApiProperty({
    description: '쓰레기통의 Y 좌표',
    example: '126.971748'
  })
  @Column("decimal", { name: "Y", precision: 9, scale: 6 })
  y: string;

  @ApiProperty({
    description: '쓰레기통 정보 생성 날짜'
  })
  @CreateDateColumn({ type: "timestamp", name: "CREATED_AT" })
  createdAt: Date;

  @ApiProperty({
    description: '쓰레기통 정보 최근 수정 날짜'
  })
  @UpdateDateColumn({ type: "timestamp", name:"UPDATED_AT"})
  updatedAt: Date;

  @ApiProperty({
    description: '쓰레기통 정보 삭제 날짜'
  })
  @DeleteDateColumn({ type: "timestamp", name: "DELETED_AT"})
  deletedAt: Date;

  @OneToMany(() => Cleaning, (cleaning) => cleaning.trashcan)
  cleanings: Cleaning[];
}
