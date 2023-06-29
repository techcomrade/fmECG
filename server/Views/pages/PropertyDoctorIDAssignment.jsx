import React, { useEffect, useState } from 'react';
import { FormGroup, FormMessage, Label  } from '@adminjs/design-system';
import Select from 'react-select'


const PatientDoctorAssignmentDoctorIDProp = (props) => {
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  useEffect(() => {
    const fetchDoctorEmail = async () => {
      try {
        const response = await fetch('/dashboard-helper/doctor-email-list');
        const data = await response.json();
        setDoctorList(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    fetchDoctorEmail();
  }, []);

  const selectOptions = doctorList.map((doctor) => ({
    value: doctor.user_id,
    label: 'Email: ' + doctor.email + ' - Name: ' + doctor.name
  }));

  const handleDoctorSelect = (selectedOption) => {
    const selectedId = selectedOption ? selectedOption.value : null;
    setSelectedDoctorId(selectedId);
    props.onChange('doctor_id', selectedId);
    console.log('selectedDoctorId: ', selectedId);
  };



  return (

    <FormGroup error={''}>
    <Label htmlFor={'doctor_id'} required={true}>Doctor</Label>
    <Select 
              
        name={'doctor_id'}
        options={selectOptions}
        required={true}
        onChange={handleDoctorSelect}
        defaultValue={null}
        value={selectOptions.find((option) => option.value === selectedDoctorId)}
            
    />
    <FormMessage>{''}</FormMessage>
</FormGroup>

  );

};

export default PatientDoctorAssignmentDoctorIDProp;
