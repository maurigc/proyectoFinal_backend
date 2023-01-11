import { app } from './app.js';
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import { logWarn, logConsola } from './scripts/log4js.js';

dotenv.config();

const numCpus = os.cpus().length;
const modo = "";

///////////////////// Puerto //////////////////////
const PORT = process.env.PORT || 8080;

if(modo === "cluster"){
    try {
        if(cluster.isPrimary){
            
            for (let i = 0; i < numCpus; i++) {
                cluster.fork();
                    
            }
                
            
        }else{
            app.listen(PORT, (err) => {
                err ? logWarn.error(`Imposible conectar al servidor`) : logConsola.info(`Servidor conectado al puerto ${PORT} correctamente.`);
            })
        }
        
    } catch (error) {
        logWarn.error(error);
    }
}else{
    try {
        app.listen(PORT, (err) => {
            err ? logWarn.error(`Imposible conectar al servidor`) : logConsola.info(`Servidor conectado al puerto ${PORT} correctamente.`);
        })
        
    } catch (error) {
        logWarn.error(error);
    }
}





