import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WalletAddress } from '../wallet-address/wallet-address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => WalletAddress, walletAddress => walletAddress.user)
  walletAddresses: WalletAddress[];
}
