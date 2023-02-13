import express from 'express';
import auth from '../middleware/auth.js';
const router=express.Router();
import {fetchUser , followUser,unfollowUser} from '../controllers/user.js';

router.get('/:id',auth,fetchUser);
router.patch('/follow',auth,followUser);
router.patch('/unfollow',auth,unfollowUser);

export default router;