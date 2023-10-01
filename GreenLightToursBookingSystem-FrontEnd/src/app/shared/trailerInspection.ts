export class Inspection{
    trailerinspectionID!: number;
    trailerID!:number;
    employeeID!:number;
    trailerStatusID!: number;
    trailerStatus?:string;
    employeeName?:string;
    trailerRegistration?:string
    checkInOut!: string;
    passOrFail!: string;
    date!: Date;
    paint!:boolean;
     tyres !:boolean;
    hitch!:boolean;
    brakes !:boolean;
    lights !:boolean;
    liscensePlate !:boolean;
    interiorFloor !:boolean;
    testDrive !:boolean;
}
