import express from 'express';
import bodyParser from 'body-parser';
import { uploadEcgData } from '../Controllers/ecgRecordController.js';

import multer from 'multer';

const ecgRecordsRoute = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

ecgRecordsRoute.post('/upload', uploadEcgData);

export default ecgRecordsRoute;
