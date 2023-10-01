import { VehicleBase } from "./vehicleBase";

export class Vehicle extends VehicleBase{
    vehicleStatus!: string;
    vehicleType!: string;
    img!: string;
    vehiclePrice!: number;
}