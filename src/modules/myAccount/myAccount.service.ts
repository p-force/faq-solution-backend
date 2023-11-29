import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../placeAnOrderForm/entities/user.entity';
import { Repository } from 'typeorm';
import { PlaceAnOrderForm } from '../placeAnOrderForm/entities/placeAnOrderForm.entity';

@Injectable()
export class MyAccountService {
  constructor(
    @InjectRepository(Users) private readonly authRepository: Repository<Users>,
    @InjectRepository(PlaceAnOrderForm)
    private placeAnOrderRepository: Repository<PlaceAnOrderForm>,
  ) {}
  async getOrders(email: string): Promise<PlaceAnOrderForm[]> {
    const [orders] = await this.placeAnOrderRepository.findAndCount({
      where: { email: email },
    });
    return orders;
  }

  async getPersonalDetails(email: string) {
    const [user] = await this.authRepository.findAndCount({
      where: { email: email },
      select: ['fullName', 'email', 'phone'],
    });
    return user;
  }

  async changePersonalDetails(
    oldEmail: string,
    { email, phone, fullName }: { email: string; phone: string; fullName: string },
  ) {
    const user = await this.authRepository.findOne({
      where: { email: oldEmail },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await this.authRepository.update(
      { email: oldEmail },
      { email: email, phone: phone, fullName: fullName },
    );
  }
}
