import { Router } from "express";
import { readdirSync } from "fs";
import 'dotenv/config'


const PATH_ROUTES = `${__dirname}/`;
const router = Router();



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