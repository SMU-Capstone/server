import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("APPLICATION", { schema: "mydb" })
export class Application {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "TYPE" })
  type: number;

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


  @Column("int", { name: "NOTE" })
  note: number;
}
