import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const currentYear = new Date().getFullYear();

const MovieSchema = new Schema({
    title: {
        type:String,
        required: true,
        trie:true,
    },
    director: {
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[a-z ,.'-]+$/i,
    },
    year: {
        type: Number,
        required: true,
        min: [1896, "Year must be at least 1896"],
        max: [currentYear, "Year cannot exceed current year"],
        default: currentYear,
    
    },
    genre: {
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[a-z -]+$/i,
    },
    actors: [String],
    duration: {
        type: Number,
        required: true,
        trim: true,
        min: [45, "Duration must be at least 60 minutes"],
        max: [1800, "Duration cannot exceed 1800 minutes"],

    }, poster:{
        type: String,
        required: true,
        trim: true,
        // match: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&]*[a-zA-Z0-9@:%_+.~#?&])?$/i,
    },
    rate:{
        type: Number,
        min: [0, "Rate must be at least 0"],
        max: [10, "Rate cannot exceed 10"],
        default: 5,
    },  
},  {timestamps:true} );
MovieSchema.index({title:"text"});

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;