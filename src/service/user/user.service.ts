import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { IUser } from 'src/interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(
    cardNumber: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = await this.userModel.findOneAndUpdate(
      { cardNumber, deleted_at: null },
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User not found!`);
    }
    return existingUser;
  }

  async getUser(cardNumber: string): Promise<IUser> {
    const existingUser = await this.userModel.findOne({ cardNumber }).exec();
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }
    if (existingUser.deleted_at != null) {
      throw new NotFoundException(`User was soft-deleted`);
    }
    return existingUser;
  }

  async deleteUser(cardNumber: string): Promise<IUser> {
    const deletedUser = await this.userModel.findOneAndDelete({
      cardNumber,
      deleted_at: null,
    });
    if (!deletedUser) {
      throw new NotFoundException(`User not found`);
    }
    return deletedUser;
  }

  async isActiveProfile(cardNumber: string): Promise<boolean> {
    const user = await this.userModel.findOne({ cardNumber });
    if (user.isActiveProfile) {
      return true;
    }
    throw new NotFoundException('Profile is not active');
  }
}
