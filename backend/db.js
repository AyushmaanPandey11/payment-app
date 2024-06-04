import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
mongoose.connect("mongodb://localhost:27017/paymentApp");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLengthL: 30,

    },
    password : {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    }
},
{
    timestamps:true
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
const User =  mongoose.model("User", userSchema);
export {User};