import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
 } from 'typeorm'

 class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text"})
  target: string;
  
  @Column({ type: "text"})
  payload: string;
  
  @Column({ type: "text"})
  key: string;

  @Column({ type: "boolean"})
  used: boolean;

  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;
 }

 export default Verification;