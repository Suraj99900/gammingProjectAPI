const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    actual_name: { type: String, required: true },
    ifsc_code: { type: String, required: true },
    account_number: { type: String, required: true },
    bank_name: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    mobile_no: { type: String, required: true },
    email: { type: String, required: true },
    upi_id: { type: String, required: true },
    status: { type: String, default: 'active' },
    deleted: { type: Boolean, default: false },
    addedOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: null },
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

async function insertRecord(data) {
    try {
        const newUser = new UserInfo(data);
        const result = await newUser.save();
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateRecord(_id, data) {
    try {
        const result = await UserInfo.findOneAndUpdate({ _id: _id ,  status: 'active', deleted: false}, data, { new: true });
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteRecordByRecordID(_id) {
    try {
        const result = await UserInfo.findOneAndUpdate({ _id: _id, status: 'active', deleted: false },
            { $set: { status: 'inactive', deleted: true, updatedOn: new Date() } },
            { new: true });
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteRecordByUserId(user_id) {
    try {
        const result = await UserInfo.findOneAndUpdate({ user_id: user_id, status: 'active', deleted: false },
            { $set: { status: 'inactive', deleted: true, updatedOn: new Date() } },
            { new: true });
        return result;
    } catch (error) {
        throw error;
    }
}

async function fetchAllRecords() {
    try {
        const result = await UserInfo.find({ status: 'active', deleted: false});
        return result;
    } catch (error) {
        throw error;
    }
}

async function fetchRecordById(recordId) {
    try {
        const result = await UserInfo.findOne({'_id': recordId ,  status: 'active', deleted: false});
        return result;
    } catch (error) {
        throw error;
    }
}

async function fetchRecordByUserId(userId) {
    try {
        const result = await UserInfo.findOne({ user_id: userId ,  status: 'active', deleted: false });
        return result;
    } catch (error) {
        throw error;
    }
}

async function fetchRecordByAccountNumber(accountNumber) {
    try {
        const result = await UserInfo.findOne({ account_number: accountNumber,   status: 'active', deleted: false });
        return result;
    } catch (error) {
        throw error;
    }
}

// Add more functions as needed

module.exports = {
    insertRecord,
    updateRecord,
    deleteRecordByUserId,
    deleteRecordByRecordID,
    fetchAllRecords,
    fetchRecordById,
    fetchRecordByUserId,
    fetchRecordByAccountNumber,
};
