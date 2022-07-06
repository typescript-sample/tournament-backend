import { config } from "../config"
import { Pool } from "pg"

export const nextPool =(req,res,next) =>{ 
    const pool = new Pool(config.db)
    next(pool)
}