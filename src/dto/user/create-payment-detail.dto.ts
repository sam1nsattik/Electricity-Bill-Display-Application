export class CreatePaymentDetailDto {
    paymentAccount: string;
    pastDues: number;
    currentDue: number;
    paymentReference: string;
    qrCode: string;
  }
  