import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
 } from 'typeorm'
import Chat from './Chat';
import User from './User';

class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({type: "text"})
  text: string

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @ManyToOne(type => User, user => user.messages)
  user: User;
  
  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;
}

 export default Message;