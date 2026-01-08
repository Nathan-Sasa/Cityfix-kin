export interface IGeoLocation {
    LocId: number;
    Lng: number;
    Lat: number;
    Desc: string;
    Img: string;
    Av: string;
    Qtr: string;
    Cne: string;
    Vll: string;
    stt: string;
    date: Date;
}

export interface IProfilePost{
    LocId: number;
    Lng: number;
    Lat: number;
    Desc: string;
    Img: string;
    Av: string;
    Qtr: string;
    Cne: string;
    Vll: string;
    stt: string;
    com: string;
    date: Date;
}

export interface IUser{
    profile: string;
    name: string;
    firstName: string;
    email: string;
    password: string
    stat: string;
    dateOfBorn: Date;
    profession: string;
    address: string;
    no: number;
    street: string;
    quartier: string;
    ville: string;
}