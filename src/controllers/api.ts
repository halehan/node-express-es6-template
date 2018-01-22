"use strict";

import * as async from "async";
import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';


export let sample = (req: Request, res: Response) => {
   res.json({ message: 'API Function Works' });	
}  