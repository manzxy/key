import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Series from './models/Series.js';
import { connectDB } from './config/db.js';
dotenv.config();
await connectDB();
await Series.deleteMany({});
await Series.insertMany([
  { title: 'Solo Leveling', description: 'Action/Fantasy', cover: '/uploads/covers/solo.jpg', status: 'Complete', chapters: [{number:1,title:'Chapter 1',images:['/uploads/covers/solo.jpg']}] },
  { title: 'Tower of God', description: 'Adventure', cover: '/uploads/covers/tog.jpg', status: 'OnGoing', chapters: [{number:1,title:'Chapter 1',images:['/uploads/covers/tog.jpg']}] },
  { title: 'Eleceed', description: 'Action', cover: '/uploads/covers/eleceed.jpg', status: 'OnGoing', chapters: [{number:1,title:'Chapter 1',images:['/uploads/covers/eleceed.jpg']}] }
]);
console.log('Seed done'); process.exit(0);
