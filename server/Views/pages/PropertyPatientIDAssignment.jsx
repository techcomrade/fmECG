import React, { useEffect, useState } from 'react';
import { FormGroup, FormMessage, Label  } from '@adminjs/design-system';
import Select from 'react-select'
import { useRecord } from 'adminjs';


const PatientDoctorAssignmentDoctorIDProp = (props) => {
  const [patientList, setPatientList] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const { record } = useRecord();
  const { params, onChange } = record || {};
  useEffect(() => {
    const fetchDoctorEmail = async () => {
      try {
        const response = await fetch('/dashboard-helper/patient-email-list');
        const data = await response.json();
        setPatientList(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    fetchDoctorEmail();
  }, []);

  const selectOptions = patientList.map((patient) => ({
    value: patient.user_id,
    label: 'Email: ' + patient.email + ' - Name: ' + patient.name
  }));

  const handleDoctorSelect = (selectedOption) => {
    const selectedId = selectedOption ? selectedOption.value : null;
    setSelectedPatientId(selectedId);
    props.onChange('patient_id', selectedId);
    console.log('selectedPatientId: ', selectedId);
  };



  return (

    <FormGroup error={''}>
    <Label htmlFor={'patient_id'} required={true}>Patient</Label>
    <Select 
              
        name={'patient_id'}
        options={selectOptions}
        required={true}
        onChange={handleDoctorSelect}
        defaultValue={null}
        value={selectOptions.find((option) => option.value === selectedPatientId)}
            
    />
    <FormMessage>{''}</FormMessage>
</FormGroup>

  );

};

export default PatientDoctorAssignmentDoctorIDProp;
