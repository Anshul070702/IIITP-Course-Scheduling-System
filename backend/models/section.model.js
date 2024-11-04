import mongoose, {Schema} from 'mongoose'

const sectionSchema = new Schema( {
    sectionId: {
        type: String,
        required: true,
        unique: true,
    },
    departmentName: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
}, {timestamps: true} )


export const Section = mongoose.model( "Section", sectionSchema )