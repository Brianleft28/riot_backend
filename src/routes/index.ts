import { Router } from "express";
import { readdirSync } from "fs";
import 'dotenv/config'


const PATH_ROUTES = `${__dirname}/`;
const router = Router();

// Middleware para validar solicitudes
router.use((req, res, next) => {
    const api_key = req.headers['api_key'];
    if (api_key === process.env.RIOT_API_KEY) {
        console.log('Time:', Date.now());
        next();
    } else {
        res.status(401).send({message: 'Unauthorized'});
        return;
    }

});

const cleanFileName = (fileName: string) => {
    const file = fileName.split('.').shift();
    return file;
}

readdirSync(PATH_ROUTES).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== 'index') {
        import(`./${cleanName}`).then((moduleRoute)=> {
            console.log(`Route /${cleanName} loaded`);
            router.use(`/${cleanName}`, moduleRoute.default);
        })
    }
})


export default router;