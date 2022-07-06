import { Pool } from "pg";
import { config } from "../config";
import { generateRound } from "../common/generate";


export const getRoundGenerated = (pool,req,res,next) =>{
    const teamNumber = 16

    pool.query('SELECT * FROM teams ORDER BY id ASC', (error, results) => {
    if (error) {
      res.status(400).json({error: error})
    }
        let index = results.rows.length+1
        console.log(index)
    
        while(index <=teamNumber){
            pool.query(`insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('PL${index}','Brooklyn Nets ${index}','unknown ','unknown','hello form downtown ${index}','2022-2023 NBA Champs','draft','${index}')`,(error,results)=>{
                if(error){
                    res.status(400).json({error: error})
                }
            })
            index++;
        }
 
        const roundGenerated = generateRound(results.rows)
 
        res.status(200).json({data: roundGenerated})
    })



}

// module.exports = {
//     getRoundGenerated
// }