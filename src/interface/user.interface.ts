import { Document } from 'mongoose';
export interface IUser extends Document{
    readonly userName: string;
    readonly email: string;
    readonly phone_number: string;
    readonly cardNumber: string;
    readonly address: string;
    readonly other: string;
    readonly naturality: string;
    readonly family: string;
    readonly isActiveProfile: boolean;
    deleted_at: Date;
}