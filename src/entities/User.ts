
import bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { 
  BaseEntity, 
  BeforeInsert,
  BeforeUpdate,
  Column, 
  CreateDateColumn,
  Entity, 
  ManyToOne,
  OneToMany, 
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Chat from './Chat';
import Message from './Message';

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", unique: true})
  @IsEmail()
  email: String;

  @Column({ type: "boolean", default: false})
  verifiedEmail: boolean;

  @Column({ type: "text"})
  firstName: string;

  @Column({ type: "text"})
  lasttName: string;

  @Column({ type: "int"})
  age: number;
  
  @Column({ type: "text"})
  password: string;

  @Column({ type: "text"})
  phoneNumber: string;

  @Column({ type: "boolean", default: false})
  verifiedPhoneNumber: boolean;

  @Column({ type: "text"})
  profilePhoto: string;

  @ManyToOne(type => Chat, chat => chat.participants)
  chat: Chat;

  @OneToMany(type => Message, message => message.user)
  messages: Message[]

  @Column({ type: "boolean", default: false})
  isDriving: string;

  @Column({ type: "boolean", default: false})
  isRiding: string;

  @Column({ type: "boolean", default: false})
  isTaken: string;

  @Column({ type: "double precision", default:0})
  lastLng: number;

  @Column({ type: "double precision", default:0})
  lastLat: number;
  
  @Column({ type: "double precision", default:0})
  lastOrientation: number;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  get fullName() : string {
    return `${this.firstName} ${this.lasttName}`
  }

  @CreateDateColumn() createAt: string;

  @UpdateDateColumn() updateAt: string;

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword() : Promise<void> {
    if(this.password) {
        const hashedPassword = await this.hashPassword(this.password);
        this.password = hashedPassword;
    }
  }
}

export default User;