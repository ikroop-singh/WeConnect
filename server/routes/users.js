import express from 'express';
import auth from '../middleware/auth.js';
const router=express.Router();
import {fetchUsers,fetchUser , followUser,unfollowUser,profileUpdate,searchUsers} from '../controllers/users.js';

router.get('/',auth,fetchUsers)
router.get('/profile/:id',auth,fetchUser);
router.patch('/profileupdate',auth,profileUpdate)
router.patch('/follow',auth,followUser);
router.patch('/unfollow',auth,unfollowUser);
router.get('/search',auth,searchUsers);


export default router;