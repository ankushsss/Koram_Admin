import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, FilledInput } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
// import { axiosPost } from 'src/axiosMethod/axiosPost';
// ----------------------------------------------------------------------

export default function AddRoom(props) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    name:"",
    category:"",
    subCategory:"",
    superCategory:"",
  })
useState(()=>{

    if(props.singleRoom)
    {
   setInputData({name:props.singleRoom.name,
    category:props.singleRoom.category,
    subCategory:props.singleRoom.subCategory,
    superCategory:props.singleRoom.superCategory})
   }

},[])

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

 

console.log(props)

  const onSubmit = async () => {
    console.log(inputData)
    const formData = new FormData();
    formData.append("name",inputData.name);
    formData.append("category",inputData.category);
    formData.append("subCategory",inputData.subCategory);
    formData.append("superCategory",inputData.superCategory);
   
    if(!props.singleRoom)
    {
    axios.post(`http://www.koram.in:3000/api/v1/addchatrooms`,inputData).then(
      (res)=>{
          console.log(res)
          props.setRightDrawer({"right":false})
          props.setAlertMssg({open:true,messege:"successfully room add",type:"success"})
          props.reload()
      }
    ).catch((err)=>{
      console.log(err)
      props.setRightDrawer({"right":false})
      props.setAlertMssg({open:true,messege:err.messege,type:"error"})

    })
    }
else
{
    formData.append("_id",props.singleRoom._id)
    axios.post(`http://www.koram.in:3000/api/v1/editchatrooms`,{data:inputData,_id:props.singleRoom._id}).then(
        (res)=>{
            console.log(res)
             props.setRightDrawer({"right":false})
             props.setAlertMssg({open:true,messege:"successfully room edit",type:"success"})
             props.reload()
        }).catch((err)=>{
          props.setRightDrawer({"right":false})
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
          label="Category"
          name="category"
          multiline
          maxRows={4}
          value={inputData.category}
          onChange={handleTextChange}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="subCategory"
          name="subCategory"
          multiline
          maxRows={4}
          value={inputData.subCategory}
          onChange={handleTextChange}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="superCategory"
          name="superCategory"
          multiline
          maxRows={4}
          value={inputData.superCategory}
          onChange={handleTextChange}
        />
        
        <br/>
      
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
        Edit
      </LoadingButton>
      </>
  );
}
