import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Link, Stack, IconButton, InputLabel, TextField, FilledInput, FormControl, Select, MenuItem } from '@mui/material';
import { DesktopDatePicker, LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';

// import { axiosPost } from 'src/axiosMethod/axiosPost';
// ----------------------------------------------------------------------

export default function AddUsers(props) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    alias: "",
    dateofbirth: dayjs('2014-08-18T21:11:54'),
    gender: "",
    lat: 0,
    lon: 0,
    name: "",
    phone_number: "",
    profile_pic_url: "",
    public_gender: "",
    role: ""
  })
  console.log(props)
useState(()=>{

    if(props.singleUser)
    {
   setInputData({
  alias: props.singleUser.alias,
   dateofbirth: props.singleUser.dateofbirth,
   gender: props.singleUser.gender,
   lat: props.singleUser.lat,
   lon: props.singleUser.lon,
   name: props.singleUser.name,
   phone_number: props.singleUser.phone_number,
   public_gender: props.singleUser.public_gender,
   role: props.singleUser.role})
   }

},[])

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

 

console.log(props)

  const onSubmit = async () => {
    console.log(inputData)

   
    if(!props.singleUser)
    {
        console.log(inputData)
    axios.post(`http://www.koram.in:3000/api/v1/addUser`,inputData).then(
      (res)=>{
          console.log(res)
          props.setRightDrawer({right:false})
          props.setAlertMssg({open:true,messege:"Data Add successfully",type:"success"})
          props.reload()
 
      }
    ).catch((err)=>{
      console.log(err)
      props.setRightDrawer({right:false})
            props.setRightDrawer({right:false})
            props.setAlertMssg({open:true,messege:err.messege,type:"error"})
     
    })
    }
else
{
    console.log(props.singleUser)
    axios.post(`http://www.koram.in:3000/api/v1/editUser`,{data:inputData,_id:props.singleUser._id}).then(
        (res)=>{
            console.log(res)
            // props.toggleDrawer("right", false)
            props.setRightDrawer({right:false})
            props.setAlertMssg({open:true,messege:"Data edit successfully",type:"success"})
            props.reload()
           
        }).catch((err)=>{
          props.setRightDrawer({right:false})
            props.setRightDrawer({right:false})
            props.setAlertMssg({open:true,messege:err.messege,type:"error"})
        })
}
  };

  const handleTextChange = (e)=>{
     const name = e.target.name
     const value = e.target.name === "image"?e.target.files[0]:e.target.value

     setInputData({...inputData,[name]:value})
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          id="outlined-multiline-flexible"
          label="Name"
          name="name"
          multiline
          maxRows={4}
          value={inputData.name}
          onChange={handleTextChange}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="alias"
          name="alias"
          multiline
          maxRows={4}
          value={inputData.alias}
          onChange={handleTextChange}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="lon"
          name="lon"
          multiline
          maxRows={4}
          value={inputData.lon}
          onChange={handleTextChange}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="lat"
          name="lat"
          multiline
          maxRows={4}
          value={inputData.lat}
          onChange={handleTextChange}
        />
        
  
        <TextField
          id="outlined-multiline-flexible"
          label="phone_number"
          name="phone_number"
          multiline
          maxRows={4}
          value={inputData.phone_number}
          onChange={handleTextChange}
        />
        
         <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="gender">Gender</InputLabel>
      <Select
        labelId="gender"
        id="gender"
        value={inputData.gender}
        label="gender"
        name="gender"
        onChange={handleTextChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
      </FormControl>
      <br/>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="public_gender">Public Gender</InputLabel>
      <Select
        labelId="public_gender"
        id="public_gender"
        value={inputData.public_gender}
        label="Public_gender"
        name="public_gender"
        onChange={handleTextChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>
        <br/>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="public_gender">Role</InputLabel>
      <Select
        labelId="role"
        id="role"
        value={inputData.role}
        label="Role"
        name="role"
        onChange={handleTextChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="User">User</MenuItem>
      </Select>
    </FormControl>
    <br/>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
        Edit
      </LoadingButton>
      </>
  );
}
