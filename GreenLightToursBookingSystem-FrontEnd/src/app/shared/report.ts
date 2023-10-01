export class Report{
    city!:string
    numberOfBooking!:number
    subTotal!:number
    bookings!:booking[]
}

class booking{
    date!:Date
    totalPrice!:number
}