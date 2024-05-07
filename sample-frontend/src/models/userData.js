// src/models/userData.js

import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true // Prevents the date field from being changed
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId, // Assuming userID is referring to the ObjectId of the user
        ref: 'users',
        required: true,
    }
})

const UserData = mongoose.models.UserData || mongoose.model('UserData', userDataSchema);

export default UserData;
