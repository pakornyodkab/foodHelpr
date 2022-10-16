import * as mongoose from 'mongoose';

export const PartySchema = new mongoose.Schema({
    name: { type: String, required: true },
    restaurant: { type: String, required:true },
    apptDate: { type: Date, required:true },
    memberList: { type: [String], required:true },
    ageRestriction: { type: Number, required:true },
    maxGuests: { type: Number, required:true },
    ownerId: { type: String, required:true }
})

export interface Party {
    name: string;
    restaurant: string;
    apptDate: Date;
    memberList: Array<string>;
    ageRestriction: number;
    maxGuests: number;
    ownerId: string;
}