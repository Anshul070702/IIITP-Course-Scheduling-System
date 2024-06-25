import mongoose, {Schema} from 'mongoose'

const courseSchema = new Schema( {
    courseId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    credit: {
        type: Number,
        required: true,
    },
    coursecapacity: {
        type: Number,
        required: true
    }
}, {timestamps: true} )


export const Course = mongoose.model( "Course", courseSchema )