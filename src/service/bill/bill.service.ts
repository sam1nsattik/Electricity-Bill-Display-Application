import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill, BillDocument } from 'src/schema/bill.schema';
import { CreateBillDto } from 'src/dto/create-bill.dto'

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private billModel: Model<BillDocument>,
  ) {}

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const createdBill = new this.billModel(createBillDto);
    return createdBill.save();
  }

  async findAll(): Promise<Bill[]> {
    return this.billModel.find().populate('clients meterReadings amountDetails paymentDetails').exec();
  }

  async findOne(id: string): Promise<Bill> {
    return this.billModel.findById(id).populate('clients meterReadings amountDetails paymentDetails').exec();
  }

  async remove(id: string): Promise<void> {
    await this.billModel.findByIdAndRemove(id).exec();
  }
}
