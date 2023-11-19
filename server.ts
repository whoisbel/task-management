import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { db } from './app/models';
import router from './app/routes/api.endpoint';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
db.mongoose.connect(db.url).then(() => {
    console.log("⚡️[server]: Connected to database")
}).catch(err => {
    console.log("⚡️[server]: Cannot connect to database", err.message)
    process.exit()
})

app.use('/api', router)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});