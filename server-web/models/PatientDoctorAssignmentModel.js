const CommonModel = require("./CommonModel");

class PatientDoctorAssignmentModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }

   

}


module.exports = new PatientDoctorAssignmentModel();