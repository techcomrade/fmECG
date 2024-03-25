const CommonModel = require("../../models/CommonModel");
const PatientDoctorAssignmentDTO = require('./PatientDoctorAssignmentDTO')
class PatientDoctorAssignmentModel extends CommonModel{
    async getAllData(){
        return await PatientDoctorAssignmentDTO.findAll();
    }


}



module.exports = new PatientDoctorAssignmentModel();