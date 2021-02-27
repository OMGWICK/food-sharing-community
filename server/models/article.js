const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DynamicSchema = new Schema({
    title:String,
    content: String,
    // time:{
    //     type:Date,
    //     default:Date.now
    // },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    coverImgUrl: String,
    likeNumber: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})

module.exports = mongoose.model('Dynamic', DynamicSchema)