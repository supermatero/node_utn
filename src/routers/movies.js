import { Router } from "express";
import { movieController } from "../controllers/movies.js";
import { verifyAccessToken } from "../middleware/VerifyAccessToken.js";
export const router = Router();

router.get("/", movieController.getMovies );
router.get("/s", movieController.getMovieByTitle );
router.post("/", verifyAccessToken, movieController.createMovie );
router.patch("/:id", verifyAccessToken, movieController.updateMovie );
router.delete("/:id", verifyAccessToken, movieController.deleteMovie );
