const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
	username: {
    	type: String,
    	required: [true, "A valid username is required"],
    },
    password: {
    	type: String,
    	required: [true, "A valid password is required"],
    },
    tasks: [
		{
            text: {
                type: String,
                required: [true, "Task is required"]
            },
            isDone: {
                type: Boolean,
                default: false
            },
            timestamp: {
                type: String,
                default: Date.now()
            },
            date:{
                type: String,
                required: [true, "Date is required"]
            }
        },
    ],
});

accountSchema.statics.findAndAuthenticate = async function(username, password) {
    const user = await this.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        return user;  // Returning the entire user object
    }
    return null; // Authentication failed
};

// when account is updated or created, password is automatically hashed before saving
accountSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // if password not modified, save without rehashing
    this.password = await bcrypt.hash(this.password, 12); //if modified, rehash
    next();
});

module.exports = mongoose.model("Account", accountSchema);
