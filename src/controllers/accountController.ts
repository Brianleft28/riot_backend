import axios from "axios";
import { Request, Response } from "express";
const riotApiKey = process.env.RIOT_API_KEY;

export const getAccountByGameNameTagLine = async (req: Request, res: Response) => {
    const { gameName, tagLine } = req.params;

    if (!riotApiKey) {
        return res.status(500).send({ message: 'API key is not configured' });
    }

    try {
        const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${riotApiKey}`);
        const accountData = response.data;
        return res.json(accountData);
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(404).send({ message: 'Account not found or API request failed' });
        }
    }
};

export const getSummonerByPuuid = async (req: Request, res: Response) => {
    const { puuid } = req.params;
    const riotApiKey = process.env.RIOT_API_KEY;
    if(!riotApiKey) {
        return res.status(500).send({ message: 'API key is not configured' });
    }
    try {
        const response = await axios.get(`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${riotApiKey}`)
        const summonerData = response.data;
        return res.json(summonerData);
    } catch (error){
        console.error(error);
        if (!res.headersSent) {
            return res.status(404).send({ message: 'Summoner not found or API request failed' });
        }
    }
}