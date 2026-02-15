import mongoose, { mongo } from 'mongoose';

const participantSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    socketId : String,
    studentId : String
})

// export default mongoose.model('Participant', participantSchema);

const Participant = mongoose.model("Participant" , participantSchema);
export default Participant;