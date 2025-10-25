import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { sendSecurityEmail } from '../utils/mailer.js';
const router = express.Router();
const upload = multer({ dest: './public/uploads' });

function requireLogin(req,res,next){ if(!req.user) return res.status(401).json({error:'Login required'}); next(); }

router.get('/', requireLogin, async (req,res)=> {
  const u = await User.findOne({ uid: req.user.uid });
  res.json({ name: u.name, email: u.email, picture: u.picture, title: u.title });
});

router.put('/', requireLogin, upload.single('picture'), async (req,res) => {
  const { name, oldPassword, newPassword } = req.body;
  const u = await User.findOne({ uid: req.user.uid });
  if (!u) return res.status(404).json({ error:'User not found' });
  if (name) u.name = name;
  if (req.file) { u.picture = '/uploads/' + req.file.filename; }
  if (oldPassword && newPassword) {
    const ok = await bcrypt.compare(oldPassword, u.password || '');
    if (!ok) return res.status(400).json({ error: 'Incorrect old password' });
    u.password = await bcrypt.hash(newPassword, 10);
    // send security email
    if (u.email) {
      sendSecurityEmail(u.email, 'Password changed', `<p>Hai ${u.name}, password akunmu telah berubah.</p>`);
    }
  }
  await u.save();
  res.json({ success: true });
});

export default router;
