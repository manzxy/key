import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/reader' }), (req, res) => {
  res.redirect('/admin');
});
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/reader' }), (req, res) => {
  res.redirect('/admin');
});

router.get('/logout', (req, res) => {
  req.logout(() => {});
  res.redirect('/reader');
});

export default router;
