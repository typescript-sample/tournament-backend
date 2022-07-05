import { randomNumber } from "./randomNumber";

interface Round{
    doi1: string;
    doi2: string;
}

interface Team{
    id: number;
    name: string;
}

export const generateRound =(teamArray: Team[]) =>{
    let index = teamArray.length
    console.log(teamArray.length)
    const round =[]
    const flagArray:number[] = []
    const temp = 0
    do{
        const team = randomNumber(0, teamArray.length-1);

        if(flagArray.indexOf(team)=== -1){
            flagArray.push(team)
            round.push(teamArray[team])
            index = index - 1;
        }
    }while(index >0)
    

    return round
}