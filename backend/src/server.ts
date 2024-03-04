import express from 'express';
import { router } from './routes';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8000, () => {
    console.log('server is running on http://localhost:8000');
});