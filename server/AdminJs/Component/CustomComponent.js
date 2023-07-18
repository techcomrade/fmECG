const { ComponentLoader } = require('adminjs');
const componentLoader = new ComponentLoader();


const Components = {
    Dashboard: componentLoader.add('Dashboard', '../../Views/pages/Dashboard.jsx'),
    // ShowECGRecord: componentLoader.add('ShowECGRecord', '../../Views/pages/ShowECGRecord.jsx'),
    PatientDoctorAssignmentDoctorIDProp: componentLoader.add('PatientDoctorAssignmentDoctorIDProp', '../../Views/pages/PropertyDoctorIDAssignment.jsx'),
    PatientDoctorAssignmentPatientIDProp: componentLoader.add('PatientDoctorAssignmentPatientIDProp', '../../Views/pages/PropertyPatientIDAssignment.jsx'),
    NewsContentInput: componentLoader.add('NewsContentInput', '../../Views/pages/NewsContentInput.jsx'),
    ShowNewsContents: componentLoader.add('ShowNewsContent', '../../Views/pages/ShowNewsContent.jsx'),
    ListNewsContent: componentLoader.add('ListNewsContent', '../../Views/pages/ListNewsContent.jsx'),
    // UploadNewsImage: componentLoader.add('UploadNewsImage', '../../Views/pages/UploadNewsImage.jsx'),
    // other custom components
  };

  module.exports = {componentLoader, Components}
