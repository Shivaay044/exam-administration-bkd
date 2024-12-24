const questionModel = require("../models/question.model");





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
        const questions = await questionModel.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching questions', error: err });
    }
}

const getResult = async (req, res) => {
    const { answers } = req.body;
    const exam = await Exam.findById(req.params.id);

    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    let score = 0;
    exam.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
            score++;
        }
    });

    const passed = score >= exam.questions.length / 2;

    const result = new Result({
        user: req.user._id,
        exam: exam._id,
        answers,
        score,
        passed,
    });

    try {
        await result.save();
        res.json({
            message: 'Exam completed',
            score,
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