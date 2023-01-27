/* eslint-disable import/no-cycle */
/* eslint-disable quotes */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import express from "express";
import userController from "../controllers/user.controller.js";
import validator from "../validators/validator.js";
import validateUserSignInSchema, { validateUpdateFirstname, validateUpdateLastname, validateUpdateUsername } from "../validators/user.validator.js";
import authentication from "../middlewares/auth.middlewares.js";
import store from "../config/multer.config.js";

const userRouter = express.Router();
userRouter.post("/signup", [store.single('image')], userController.create);
userRouter.post("/login", [validator(validateUserSignInSchema)], userController.loginUser);
userRouter.get("/verified-user", userController.getVerifiedUser);
userRouter.put("/updateimage", authentication, store.single('image'), userController.updateUserPhoto);
userRouter.put("/updateusername", [authentication, validator(validateUpdateUsername)], userController.updateUsername);
userRouter.put("/updatefirstname", [authentication, validator(validateUpdateFirstname)], userController.updateFirstname);
userRouter.put("/updatelastname", [authentication, validator(validateUpdateLastname)], userController.updateLastname);

userRouter.get('/verify/:token', userController.verify);

export default userRouter;
