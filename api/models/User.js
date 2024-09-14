const mongoose=require('mongoose');
const {Schema,model}=mongoose;

UserSchema=new Schema({
    username:{type:String,required:true,min:4,unique:true},
    password:{type:String,required:true}
})

UserModel=model("User",UserSchema);

module.exports=UserModel;