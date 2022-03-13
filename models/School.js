const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true},
        name: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        gislocation: {type: String, unique: true},
        pincode: {type: String, required: true},
        address: {type: String, required: true},
        state: {type: String, required: true},
        district: {type: String, required: true},
        block: {type: String, required: true},
        cluster: {type: String, required: true},
        phonenumber: {type: Number, required: true},
        headmastername: {type: String, required: true},
        numberofstudents: {type: Number, required: true},
        numberofteachers: {type: Number, required: true},
        premises: {type: String, required: true},
        buildingsize: {type: String, required: true},
        buildingarea: {type: String, required: true},
        yearofconstruction: {type: Number, required: true},
        schoolphoto: {type: String, required: true},
        headmasterphoto: {type: String, required: true},
        numberoflabs: {type: String, required: true},
        labvideo: {type: String, required: true},
        numberofrooms: {type: Number, required: true},
        isMaintenanceRequired: {type: String, required: true},
        maintenancevideo: {type: String},
        maintenanceimages: {type: Array},
    },{timestamps: true}
    
);

module.exports = mongoose.model('User',SchoolSchema);