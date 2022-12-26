/* eslint-disable import/no-cycle */
/* eslint-disable quotes */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import express from "express";
import multer from 'multer';
import userController from "../controllers/user.controller.js";
import validateUserSignUpSchema from "../validators/signup.validator.js";
import validator from "../validators/validator.js";
import validateUserSignInSchema from "../validators/signin.validator.js";
import checkAuth from "../middlewares/auth.middlewares.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const userRouter = express.Router();
userRouter.post("/signup", [validator(validateUserSignUpSchema)], userController.create);

userRouter.post("/login", [validator(validateUserSignInSchema)], userController.loginUser);
userRouter.get("/verified-user", userController.getVerifiedUser);
userRouter.get("/get-by-id", userController.getUserById);
userRouter.put("/image", checkAuth, upload.single('photo'), userController.updateUserPhoto);

userRouter.get('/verify/:token', userController.verify);

export default userRouter;
