import Movie from "../models/mongoDb/Movie.js";

export const movieController = {
    async getMovies(req, res) {
        try{
            const movies = await Movie.find();
            movies.length ?
                res.status(200).json({success:true, message:"Movie Collection", result:movies})
                : res.status(404).json({success:false, message:"No movies found"});
        }catch(e){
            res.status(500).json({success:false, message:"Internal Server Error", error: e.message});
        }
    },
    // async getMovieById(req, res) {
       
    // },

    async getMovieByTitle(req, res){
        const {title} = req.query
        if(!title){
            return res.status(400).json({success:false, message:"Title is required"});
        }

        try{
            const movie = await Movie.findOne({title:{$regex: title, $options:"i"}});
            console.log(movie);
            if(!movie){
                return res.status(404).json({success:false, message:"Movie not found"});
            }
            res.status(200).json({success:true, message:"Movie found", result:movie});
        }catch(e){
            res.status(500).json({success:false, message:"Internal Server Error", error: e.message});
        }
    },

    async createMovie(req, res) {
        const {title, year, director, duration, poster, genre, rate} = req.body
        try{
            const newMovie = new Movie({title, year, director, duration, poster, genre, rate});
            const savedMovie = await newMovie.save();
            res.status(201).json({success:true, message:"Movie created successfully", result:savedMovie});
        }catch(e){
            res.status(500).json({success:false, message:"Internal Server Error", error: e.message});
        }
    },

    async updateMovie(req, res) {
        try{
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new:true});
            
            if(!updateMovie){
                return res.status(404).json({success:false, message:"Movie not found"});
            }
            res.status(200).json({success:true, message:"Movie Updated", data:updateMovie});
        }catch(e){
            res.status(500).json({success:false, message:"Internal Server Error", error: e.message});
        }
    },

    async deleteMovie(req, res) {
        try{
            const movie = await Movie.findByIdAndDelete(req.params.id);
            if(!movie){
                return res.status(404).json({success:false, message:"Movie not found"});
            }
            res.status(204).json({success:true, message:"Borrado Exitoso !!"});
        }catch(e){
            res.status(500).json({success:false, message:"Internal Server Error", error: e.message});
        }
    },
}