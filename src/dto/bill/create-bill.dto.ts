import { CreateClientDto } from './create-client.dto';
import { CreateMeterReadingDto } from './create-meter-reading.dto'
import { CreateAmountDetailDto } from './create-amount-detail.dto';
import { CreatePaymentDetailDto } from './create-payment-detail.dto';

export class CreateBillDto {
  issueDate: Date;
  dueDate: Date;
  companyLogo: string;
  billingSupportDetails: string;
  clients: CreateClientDto[];
  meterReadings: CreateMeterReadingDto[];
  amountDetails: CreateAmountDetailDto[];
  paymentDetails: CreatePaymentDetailDto[];
}
