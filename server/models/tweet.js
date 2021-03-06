var mongoose = require('mongoose');
var EmotionalTweetSchema = mongoose.Schema({
    user_id: String,
    name: String,
    text: String,
    profile_name: String,
    location: [],
    profile_pic: String,
    pic: String,
    createdOn: { type : Date, default: Date.now },
    kanjoData: {
	joysad: Number,
	likedislike: Number,
	angerfear: Number
    }
});

EmotionalTweetSchema.index({location: "2d"});
module.exports = mongoose.model('EmotionalTweet', EmotionalTweetSchema);
