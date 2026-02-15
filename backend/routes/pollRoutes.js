import express from 'express';
import { fetchActivePoll, getPollHistory } from '../controllers/pollController.js';

const router = express.Router();

router.get('/active' ,  fetchActivePoll);
router.get("/history" , getPollHistory);

export default router;

