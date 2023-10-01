export class User{
    userId !: number
    name !:string;
    surname !: string;
    userName!: string;
    password !: string;
    userEmail !: string;
    accessToken  !: string;
    role  !: string;
    refreshToken !: string;
    rTokenExpiry  !: Date;
    resetPasswordToken !: string;
    resetPasswordExpiry  !: Date;
    emailAddress !: string;
}