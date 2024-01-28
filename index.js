import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import router from "./routes/cards.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}));

app.use("/cards",router);

const port = process.env.PORT || 4001 ;
const url = process.env.MONGO_URL ;

mongoose.connect(`${url}`,{
})
.then(()=> app.listen(port , ()=>{
    console.log(`Server is listening on port ${port} .`)
}))
.catch((e)=>console.log(e))