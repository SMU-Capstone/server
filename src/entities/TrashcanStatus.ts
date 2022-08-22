import { ApiProperty } from "@nestjs/swagger"
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn
} from "typeorm";
import { Trashcan } from "./Trashcan";

@Index("fk_TrashcanStatus_Trashcan_idx", ["trashcanId"], {})
@Entity("TRASHCAN_STATUS", { schema: "mydb"})
export class TrashcanStatus {
    @PrimaryGeneratedColumn({ type: "int", name: "ID" })
    id: number;

    @CreateDateColumn({
        type: "timestamp",
        name: "CREATED_AT",
        default: "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @DeleteDateColumn({
        type: "timestamp",
        name: "DELETED_AT",
        nullable: true,
        default: null
    })
    deletedAt: Date | null;

    @Column("tinyint", { name: "IS_FULL"})
    isFull: number;

    @ApiProperty({
        description: '꽉 찬 쓰레기통의 ID',
        example: '1',
      })
      @Column("int", { name: "TRASHCAN_ID" })
      trashcanId: number;
    
      @ManyToOne(() => Trashcan, (trashcan) => trashcan.trashcanStatuses, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
      })
      @JoinColumn([{ name: "TRASHCAN_ID", referencedColumnName: "id" }])
      trashcan: Trashcan;
}