import mongoose, {Schema} from 'mongoose'

const meetingSchema = new Schema( {
    timeId: {
        type: String,
        unique: true,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    }
}, {timestamps: true} )


export const Meeting = mongoose.model( "Meeting", meetingSchema )