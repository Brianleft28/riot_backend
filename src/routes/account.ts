import { Router } from "express";
import { getAccountByGameNameTagLine, getSummonerByPuuid } from "../controllers/accountController";

const router = Router();

router.get('/acc/:gameName/:tagLine', getAccountByGameNameTagLine)
router.get('/summoner/:puuid', getSummonerByPuuid)


export default router;