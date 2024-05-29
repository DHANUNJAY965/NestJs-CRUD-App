import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';

@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  @Post()
  create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
    return this.walletAddressService.create(createWalletAddressDto);
  }

  @Get()
  async findAll() {
    const addresses = await this.walletAddressService.findAll();
    if (addresses.length === 0) {
      throw new HttpException('No wallet addresses found', HttpStatus.NOT_FOUND);
    }
    return addresses;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const address = await this.walletAddressService.findOne(+id);
    if (!address) {
      throw new HttpException('Wallet address not found', HttpStatus.NOT_FOUND);
    }
    return address;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWalletAddressDto: UpdateWalletAddressDto) {
    const address = await this.walletAddressService.update(+id, updateWalletAddressDto);
    if (!address) {
      throw new HttpException('Wallet address not found', HttpStatus.NOT_FOUND);
    }
    return address;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.walletAddressService.remove(+id);
    if (result.affected === 0) {
      throw new HttpException('Wallet address not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Wallet address successfully deleted' };
  }
}
