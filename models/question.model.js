const mongoose = require("mongoose");

const schema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: Number, required: true },
        },
    ],
},{
    timestamps:true,
    versionKey:false
})

const questionModel = mongoose.model("exam",schema);
module.exports = questionModel;