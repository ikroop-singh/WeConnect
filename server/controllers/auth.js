import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import users from '../models/users.js'

export const signin = async (req, res) => {
   const { email, password } = req.body;
   
   try {

      const userExists = await users.findOne({ email });
      if (!userExists) {
         return res.status(404).send({ message: "user doen't exists" });
      }

      const passwordComapre = await bcrypt.compare(password, userExists.password);
      if (!passwordComapre) {
         return res.status(400).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: userExists.email, id: userExists._id }, 'itsasecrete', { expiresIn: '1h' });
      res.status(200).send({ result: userExists, token });
   }
   catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
}

export const signup = async (req, res) => {
   const { email, password, confirmPassword, firstName, lastName ,profilePic} = req.body;
  
   try {
      const userExists = await users.findOne({ email });
      if (userExists) {
         return res.status(404).send({ message: "user already exists" });
      }
      
      if (password !== confirmPassword) {
         return res.status(400).send({ message: 'passwords does not match' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await users.create({ email, password: hashedPassword,profilePic, name: `${firstName} ${lastName}` });
      const token = jwt.sign({ email: result.email, id: result._id }, 'itsasecrete', { expiresIn: '1h' });
      res.status(200).send({ result, token });
   }

   catch (error) {
      res.status(500).send({ message: 'Something went wrong' });
   }
}