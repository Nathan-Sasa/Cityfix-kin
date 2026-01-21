export interface IProfile {
    avatar?: string;
    username: string;
    email: string;
    status: string;
}

export interface IBio {
    id: number
    nom?: string;
    prenom?: string;
    genre?: string;
    description?: string;

    email: string;
    telephone?: number;

    ville?: string;
    commune?: string;
    etatCivil?: string;
    travail?: string;
}


export interface IPage<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}
export interface IPost {
    id: number;
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    image: string;
    imageBlur:string;
    status: 'SIGNALE' | 'ENCOURS' | 'RESOLU';
    createdAt: string;
    user: IUser;
}
// export interface IPost<IUser> {
//     user: IUser;
//     id: number;
//     title: string;
//     content: string;
//     latitude: number;
//     longitude: number;
//     image: string;
//     status: 'SINGALE' | 'ENCOURS' | 'RESOLU';
//     createdAt: Date;
// }

export interface IUser {
    id: number;
    username: string;
    avatar: string;
    userStatus: string;
}