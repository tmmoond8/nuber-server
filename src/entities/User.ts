
import { IsEmail } from 'class-validator';
import { 
  BaseEntity, 
  Column, 
  CreateDateColumn,
  Entity, 
  PrimaryGeneratedColumn,
  UpdateDateColumn 
} from 'typeorm';

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

  get fullName() : string {
    return `${this.firstName} ${this.lasttName}`
  }

  @CreateDateColumn() createAt: string;

  @UpdateDateColumn() updateAt: string;
}

export default User;