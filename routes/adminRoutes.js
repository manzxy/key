import express from 'express';
import User from '../models/User.js';
import ActivityLog from '../models/ActivityLog.js';
const router = express.Router();

function requireAdmin(req,res,next){ if(!req.user || req.user.role!=='admin') return res.status(403).json({error:'Admin only'}); next(); }

// list admins
router.get('/admins', requireAdmin, async (req,res)=> {
  const admins = await User.find({ role: 'admin' }).select('name email uid role isBanned banExpires warnings commentsCount');
  res.json(admins);
});
// add admin
router.post('/add-admin', requireAdmin, async (req,res)=> {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.role = 'admin'; await user.save();
  await ActivityLog.create({ userId: req.user.uid, action: 'Add Admin', detail: `Added ${email}` });
  res.json({ success: true });
});
// remove admin
router.post('/remove-admin', requireAdmin, async (req,res)=> {
  const { email } = req.body;
  if (email === req.user.email) return res.status(400).json({ error: 'Cannot remove yourself' });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.role = 'user'; await user.save();
  await ActivityLog.create({ userId: req.user.uid, action: 'Remove Admin', detail: `Removed ${email}` });
  res.json({ success: true });
});

// Ban / Unban user (duration: '1d','7d','perm', or null to unban)
router.post('/ban-user', requireAdmin, async (req,res)=> {
  const { email, duration } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!duration) {
    user.isBanned = false; user.banExpires = null; user.warnings = 0;
    await user.save();
    await ActivityLog.create({ userId: req.user.uid, action: 'Unban User', detail: `Unbanned ${email}` });
    return res.json({ success: true, message: 'User unbanned' });
  }
  let expires = null;
  if (duration === '1d') expires = new Date(Date.now() + 24*60*60*1000);
  if (duration === '7d') expires = new Date(Date.now() + 7*24*60*60*1000);
  if (duration === 'perm') expires = null;
  user.isBanned = true;
  user.banExpires = expires;
  await user.save();
  await ActivityLog.create({ userId: req.user.uid, action: 'Ban User', detail: `Banned ${email} (${duration})` });
  res.json({ success: true });
});

router.get('/logs', requireAdmin, async (req,res)=> {
  const logs = await ActivityLog.find().sort({ date: -1 }).limit(200);
  res.json(logs);
});
export default router;
