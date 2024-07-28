import axios from 'axios'
import { Request, Response } from "express";
const riotApiKey = process.env.RIOT_API_KEY;

export const getAllMaestries = async (req: Request, res: Response) => {
    const { puuid } = req.params;

    if (!riotApiKey) {
        return res.status(500).send({ message: 'API key is not configured' });
    }

    try {
        const response = await axios.get(`https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${riotApiKey}`);
        const maestriesData = response.data;
        return res.json(maestriesData);

    } catch (error) {
        
    }
}