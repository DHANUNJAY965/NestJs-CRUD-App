import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './wallet-address.entity';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';

@Injectable()
export class WalletAddressService {
  constructor(
    @InjectRepository(WalletAddress)
    private walletAddressRepository: Repository<WalletAddress>,
  ) {}

  create(createWalletAddressDto: CreateWalletAddressDto): Promise<WalletAddress> {
    const walletAddress = this.walletAddressRepository.create(createWalletAddressDto);
    return this.walletAddressRepository.save(walletAddress);
  }

  findAll(): Promise<WalletAddress[]> {
    return this.walletAddressRepository.find();
  }

  async findOne(id: number): Promise<WalletAddress> {
    return this.walletAddressRepository.findOne({ where: { id } }); // Corrected line
  }

  async update(id: number, updateWalletAddressDto: UpdateWalletAddressDto): Promise<WalletAddress> {
    const result = await this.walletAddressRepository.update(id, updateWalletAddressDto);
    if (result.affected === 0) {
      return undefined;
    }
    return this.walletAddressRepository.findOne({ where: { id } }); // Corrected line
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result = await this.walletAddressRepository.delete(id);
    return { affected: result.affected };
  }
}
