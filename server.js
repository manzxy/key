import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { connectDB } from './config/db.js';
import User from './models/User.js';

import apiRoutes from './routes/apiRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
await connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET || 'manzxy_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Passport serialize/deserialize
passport.serializeUser((user, done) => done(null, user.uid));
passport.deserializeUser(async (uid, done) => {
  const user = await User.findOne({ uid });
  done(null, user || null);
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const uid = 'google-' + profile.id;
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({
        uid,
        provider: 'google',
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        picture: profile.photos?.[0]?.value || ''
      });
    } else {
      // update basic info
      user.name = profile.displayName;
      user.email = profile.emails?.[0]?.value || user.email;
      user.picture = profile.photos?.[0]?.value || user.picture;
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackURL: '/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const uid = 'github-' + profile.id;
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({
        uid,
        provider: 'github',
        name: profile.displayName || profile.username,
        email: profile.emails?.[0]?.value || '',
        picture: profile.photos?.[0]?.value || ''
      });
    } else {
      user.name = profile.displayName || user.name;
      user.picture = profile.photos?.[0]?.value || user.picture;
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', commentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

// simple pages
app.get('/reader', (req,res) => res.sendFile(path.join(__dirname, 'public', 'reader.html')));
app.get('/reader/series/:id', (req,res) => res.sendFile(path.join(__dirname, 'public', 'chapter.html')));
app.get('/admin', (req,res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/profile', (req,res) => res.sendFile(path.join(__dirname, 'public', 'profile.html')));
app.get('/leaderboard', (req,res) => res.sendFile(path.join(__dirname, 'public', 'leaderboard.html')));
app.get('/', (req,res) => res.redirect('/reader'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`🚀 MANZXY ID running http://localhost:${PORT}`));
