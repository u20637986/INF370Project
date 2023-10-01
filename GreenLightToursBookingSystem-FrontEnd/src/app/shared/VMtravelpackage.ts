import { TravelPackageStatus } from "./travelPackageStatus";

export class VMtravelPackage {
    travelPackageID!:number;
    name!:String | null;
    description!:String | null;
    price!:number | null;
    date!:String | null;
    imageBase64!:string | null;
    travelPackageStatus!:TravelPackageStatus;

  }