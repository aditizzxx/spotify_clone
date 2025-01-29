import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    log_name: {
        type: String,
        required: true
    },
    causer_id: {
        type: ObjectId,
        required: true
    },
    properties: {
        type: Object,
        default: {}
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema, 'ActivityLog');

export default ActivityLog;