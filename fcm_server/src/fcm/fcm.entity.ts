import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name : 'pilly_token' })
@Unique(['token'])
export class FcmTokenEntity{
  @PrimaryGeneratedColumn()
  id : number;

  @Column({ type : 'int' })
  user_id : number;

  @Column({ type: 'varchar', length: 512, unique: true })
  token: string;  

  @Column({ type : 'varchar', length : 10 , nullable : true})
  platform : 'ios' | 'android';

  @Column({ type : 'boolean', default : true})
  isActive : boolean;

  @CreateDateColumn({ name : 'craeted_at'})
  createdAt : Date;

  @UpdateDateColumn({ name : 'updated_at'})
  updatedAt : Date;
}