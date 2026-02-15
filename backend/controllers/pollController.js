import Poll from "../models/Poll.js";
import { getActivePolls } from "../services/PollService.js";
import { getPollHistoryWithResults } from "../services/PollService.js";

export const fetchActivePoll = async(req,res)=>{
    try{

        const activePoll = await getActivePolls();
        res.status(200).json(activePoll);
        
    }catch(error){
        console.log("Error in fetchActivePoll controller:", error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export const getPollHistory = async (req, res)=>{

   try {
    const history = await getPollHistoryWithResults();
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching poll history" });
  }

}

