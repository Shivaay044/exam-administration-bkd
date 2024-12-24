const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'exam', required: true },
    answers: [Number],
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
},{
    timestamps:true,
    versionKey:false
})

const resultModel = mongoose.model("result",schema);
module.exports = resultModel;