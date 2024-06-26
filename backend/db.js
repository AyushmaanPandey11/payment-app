import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

try{
    const connectInstance= await mongoose.connect("mongodb://localhost:27017/paymentApp");
    console.log(`DB Connection Succesfully !! DB HOST: ${connectInstance.connection.host}`)
}catch(error){
    console.log("MONGODB connection FAILED ", error);
    process.exit(1)
}

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

const balanceSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    balance: {
        type: Number,
        required:true
    }
})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(inputPassword)
{
    return await bcrypt.compare(inputPassword,this.password);
}

const User =  mongoose.model("User", userSchema);
const Account = mongoose.model("Account",balanceSchema);
export {User,Account};