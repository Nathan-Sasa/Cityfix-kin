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