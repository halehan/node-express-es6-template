"use strict";

import * as async from "async";
import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

export let hiChatbot = (req: Request, res: Response) => {
  res.json('Hi Im a chatbot');	
} 

export let sample = (req: Request, res: Response) => {
   res.json({ message: 'API Function Works' });	
}  

export let postSample = (req: Request, res: Response) => {
    res.json({ message: 'Post' });	
 }

// Adds support for GET requests to our webhook
export let getWebhook = (req: Request, res: Response) => { 
    console.log('Calling getWebhook');
    
      // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "halehan";
  
// Parse the query params
let mode = req.query['hub.mode'];
console.log(' hub.mode = ' + mode);
let token = req.query['hub.verify_token'];
console.log('hub.verify_token = ' + token);
let challenge = req.query['hub.challenge'];
console.log('hub.challenge = ' + challenge);
  
// Checks if a token and mode is in the query string of the request
if (mode && token) {

  // Checks the mode and token sent is correct
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    
    // Responds with the challenge token from the request
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  
  } else {
    // Responds with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);      
  }
 }
}

export let postWebhook = (req: Request, res: Response) => {
    console.log('Calling postWebhook');
    let body = req.body;
    
      // Checks this is an event from a page subscription
      if (body.object === 'page') {
    
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
    
          // Gets the message. entry.messaging is an array, but 
          // will only ever contain one message, so we get index 0
          let webhook_event = entry.messaging[0];
          console.log(webhook_event);
        });
    
        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
      } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }
 } 