import { refundStatus } from "./refundStatus";

export class VMrefund {
    refundID!:Number;
    name!: String;
    amount!: number;
    date!:String;
    refundStatus!:refundStatus;
  }