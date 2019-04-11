import {
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
 } from 'typeorm'
import Chat from './Chat';

class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;
  
  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;
}

 export default Message;