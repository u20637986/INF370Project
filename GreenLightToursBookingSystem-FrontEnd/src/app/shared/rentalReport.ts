export class RentalReport{

    rentalType!:string;
    numberOfRentals!:number;
    subTotal!:number;
    rentals!:rental[]
}

class rental{
    date!:Date
    amount!:number
}