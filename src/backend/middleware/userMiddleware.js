import Joi from "joi";


const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(10).max(10).required(),
  address: Joi.string().max(200).required(),
  pincode: Joi.string().min(6).max(6).required(),
});
    
export const checkUsercredential = (req, res, next) => {
    console.log('user middleware');
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return next();
}