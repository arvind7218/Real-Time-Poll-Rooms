import Poll from "../models/Poll.js";
import Vote from "../models/Vote.js";

export const createPoll = async ({ question, options, duration, correctOptionIndex }) => {

    await Poll.updateMany({ active: true }, { active: false });

    const poll = await Poll.create({
        question,
        options,
        duration,
        active: true,
        correctOptionIndex,
        startTime: new Date()
    })

    return poll;
}

export const getActivePolls = async () => {


    return await Poll.findOne({ active: true }).sort({ createdAt: -1 });

}

export const submitVote = async ({ pollId, studentId, optionIndex }) => {

    return Vote.create({ pollId, studentId, optionIndex });

}

export const getPollResults = async (pollId) => {

    const votes = await Vote.find({ pollId });

    const results = {};


    votes.forEach((vote) => {
        results[vote.optionIndex] = (results[vote.optionIndex] || 0) + 1;
    })

    return results;
}

export const getPollHistoryWithResults = async () => {
    const polls = await Poll.find({ active: false }).sort({ createdAt: -1 });

    const history = [];

    for (const poll of polls) {
        const votes = await Vote.find({ pollId: poll._id });

        const counts = {};

        poll.options.forEach((_, i) => {
            counts[i] = 0;
        });

        votes.forEach(v => {
            counts[v.optionIndex]++;
        });

        history.push({
            ...poll.toObject(),
            results: counts
        });
    }

    return history;
};


export const endPoll = async (pollId) => {
    await Poll.findByIdAndUpdate(pollId, {
        active: false
    });
};