import express from 'express';
import{getPosts} from '../controllers/posts.js'
import{createPost,getPostsBySearch ,updatePost,deletePost,likePost,commentPost,deleteComment} from '../controllers/posts.js'
import auth from '../middleware/auth.js';
const router=express.Router();

router.get('/',getPosts);
router.get('/search',getPostsBySearch);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
router.patch('/:id/comments',auth,commentPost);
router.patch('/:id/deletecomment',auth,deleteComment);

export  default router; 