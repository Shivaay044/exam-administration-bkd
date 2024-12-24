const { default: mongoose } = require("mongoose");
const questionModel = require("../models/question.model");
const resultModel = require("../models/result.model");





const addQuestions =  async (req, res) => {
    const { title, questions } = req.body;

    const exam = new questionModel({
        title,
        questions,
        createdBy: req.user._id,
    });

    try {
        await exam.save();
        res.status(201).json({ message: 'Exam created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating exam', error: err });
    }
}


const getQuestions = async (req, res) => {
    try {
        if(!req.params.id){
            res.status(400).json({ message: 'User id is required' }); 
        }
        console.log(req.params.id,"id");
         const questions = await questionModel.findOne({createdBy: req.params.id}); 
        res.status(200).json(questions);    
    } catch (err) {
        res.status(400).json({ message: 'Not Valid Id', error: err });
    }
}

const getResult = async (req, res) => {
    const { questions } = req.body;
    const exam = await questionModel.findOne({createdBy: req.params.id})
    console.log(exam,"exam");
    console.log(questions,"answers");

    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    let score = 0;
    exam.questions.forEach((question, index) => {
        if (question.correctAnswer == questions[index].selectedAnswer) {
            score++;
        }
    });

    const passed = score >= exam.questions.length / 2;

    const result = new resultModel({
        user: req.user._id,
        exam: exam._id,
        questions,
        score,
        passed,
    });

    try {
        await result.save();
        res.json({
            user: req.user._id,
            exam: exam._id,
            message: 'Exam completed',
            score,
            out:exam.questions.length,
            passed,
        });
    } catch (err) {
        res.status(400).json({ message: 'Error saving result', error: err });
    }
}



module.exports = {
    addQuestions,
    getQuestions,
    getResult,
}