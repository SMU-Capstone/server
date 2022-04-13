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
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @CreateDateColumn({ type: "timestamp", name: "CREATED_AT" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name:"UPDATED_AT"})
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", name: "DELETED_AT"})
  deletedAt: Date;

  @Column("int", { name: "NOTE" })
  note: number;

  @Column("int", { name: "TRASHCAN_ID" })
  trashcanId: number;

  @ManyToOne(() => Trashcan, (trashcan) => trashcan.cleanings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "TRASHCAN_ID", referencedColumnName: "id" }])
  trashcan: Trashcan;
}
