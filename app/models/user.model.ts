import { Schema, model, connect } from 'mongoose';

interface IUser {
  first_name: string
  last_name: string
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  first_name: { type: String, required: true},
  last_name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 8}
});

const User = model<IUser>('users', userSchema);

export { User, IUser }