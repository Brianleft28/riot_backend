import { Router } from 'express';   
import { getAllMaestries } from '../controllers/maestriesController';

const router = Router();


router.get('/:puuid', getAllMaestries)

export default router;