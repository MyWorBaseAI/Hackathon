export interface IUser {
    _id?: string,
    name: string,
    email: string,
    image: string,
    gender: string,
    age: number,

    category: string,
    role: "patient" | "doctor",
    experience: number,

    createdAt?: string,
    updatedAt?: string,
}

export interface IChat {
    _id?: string,
    users: IUser[] | string[],
    user?: IUser,
    open: boolean,
    last_message: IMessage | string,
    messages?: IMessage[],
    createdAt?: string,
    updatedAt?: string,
}

export interface IComment {
    _id?: string,

    sender: IUser,
    post: IPosts | string,
    parent?: IComment | string,
    text: string,
    likes?: IUser[] | string[],
    dislikes?: IUser[] | string[],
    
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IMessage {
    _id?: string,
    
    sender: IUser,
    chat: IChat | string, 
    text: string,
    view: boolean,

    createdAt?: string,
    updatedAt?: string,
}

export interface IPosts {
    _id?: string,
    
    sender?: IUser,
    title: string,
    start_date: string,
    end_date: string,
    text: string,
    intensity: number,
    categories?: string[],
    files?: string[],
    file_desc: string,
    views?: IUser[] | string[],
    comments?: IComment[] | string[],

    createdAt?: string,
    updatedAt?: string,
}