import express, { Application, Response, Request } from "express";
import "dotenv/config";
import cors from "cors";
// import helmet from "helmet";
import ExpressFileUpoad from "express-fileupload";
import { createServer, Server as HttpServer } from "http";
const PORT = process.env.PORT || 7000;
import * as path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app: Application = express();
const server: HttpServer = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

export { io };
setupSocke(io)



import ejs from 'ejs'
import Routes from './routes/index.js'



app.use(appLimiter);
app.use(cors())
app.use(
    ExpressFileUpoad({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//*set view

app.set("view engine", "ejs");
app.set("views" , path.resolve(__dirname,
    "./views"))


    //* Routes

    app.use(Routes)

    const email = "tojada6657@ploncy.com"


app.get("/", async (req:Request , res:Response) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`,{name:"Gaurav"})
    await emailQueue.add(emailQueueName , {to:email, subject:"Testing queue email" , body:html})

    return res.json({msg:"email send sucess"})
})

// * Queue

import './jobs/index.js'
import { emailQueue, emailQueueName } from './jobs/EmailJob.js';
import { appLimiter } from './config/rateLimit.js';
import { setupSocke } from "./socket.js";

server.listen(PORT , () => {
    console.log(`Server is running on Port : ${PORT}`)
})


