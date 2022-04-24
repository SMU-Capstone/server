import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,Entity, OneToMany } from "typeorm";
import { Cleaning } from "./Cleaning";

@Entity("TRASHCAN", { schema: "mydb" })
export class Trashcan {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "TYPE" })
  type: number;

  @Column("varchar", { name: "ADDRESS", length: 45 })
  address: string;

  @Column("decimal", { name: "X", precision: 9, scale: 6 })
  x: string;

  @Column("decimal", { name: "Y", precision: 9, scale: 6 })
  y: string;

  @CreateDateColumn({ type: "timestamp", name: "CREATED_AT" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name:"UPDATED_AT"})
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", name: "DELETED_AT"})
  deletedAt: Date;


  @OneToMany(() => Cleaning, (cleaning) => cleaning.trashcan)
  cleanings: Cleaning[];
}
