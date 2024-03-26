const CommonModel = require("./CommonModel");

class PatientDoctorAssignmentModel extends CommonModel{
    getAllData(){
        return `SELECT * FROM patient_doctor_assignment;`;
    }
    add(assign) {
        return `INSERT INTO patient_doctor_assignment (id, patient_id, doctor_id, start_date, created_at, updated_at)
        VALUES ('${assign.id}', '${assign.patient_id}', '${assign.doctor_id}', '${assign.doctor_id}', '${assign.start_date}', '${assign.created_at}', '${assign.update_at}');`
    }
    deleteById(id) {
        return `DELETE FROM patient_doctor_assignment WHERE id = '${id};`
    }
    updateById(assign){
        return `UPDATE patient_doctor_assignment SET patient_id = '${assign.patient_id}', doctor_id = '${assign.doctor_id}', start_date = '${assign.start_date}',created_at = '${assign.created_at}', updated_at = '${assign.updated_at}', WHERE id = '${assign.id};`;
    }

}



module.exports = new PatientDoctorAssignmentModel();