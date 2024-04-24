import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {updateInStart,updateInFailure,updateInSuccess,deleteInFailure,deleteInStart,deleteInSuccess,signotuSuccess} from '../redux/User/userSlice'
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashProfile() {
  const dispatch=useDispatch()
    const { currentUser,error } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const[imageFileUploading,setimageFileUploading]=useState(false)
    const[formData,setFormData]=useState({})
    const[UpdateUserSuccess,setUpdateUserSuccess]=useState(null)
    const[UpdateUserFailure,setUpdateUserFailure]=useState(null)

    const[showModal,setshowModal]=useState(false)

    const filePickerRef = useRef();
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };
    useEffect(() => {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);
  
    const uploadImage = async () => {
      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write: if
      //       request.resource.size < 2 * 1024 * 1024 &&
      //       request.resource.contentType.matches('image/.*')
      //     }
      //   }
      // }
      setimageFileUploading(true)
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            'Could not upload image (File must be less than 2MB)'
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setimageFileUploading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({...formData,ProfilePicture:downloadURL})
            setimageFileUploading(false)
          });
        }
      );
    };

    const handleChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(Object.keys(formData).length===0){
        setUpdateUserFailure('No changes Made')
        return
      }
      if(imageFileUploading){
        setUpdateUserFailure('Please wait for image to uplaod')
        return;
      }
      try {
        dispatch(updateInStart());
        const res=await fetch(`/app/v1/user/update/${currentUser._id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        });

        const data=await res.json();
        if(!res.ok){
          dispatch(updateInFailure(data.message))
          setUpdateUserFailure(data.message)
          
        }else{
          dispatch(updateInSuccess(data))
          setUpdateUserSuccess('Users profile Updated')
        }
      } catch (error) {
        dispatch(updateInFailure(error.message))
        setUpdateUserFailure(error.message)

      }
    }

    const handleDeleteUser=async()=>{
      setshowModal(false);
      try {
        dispatch(deleteInStart());
        const res=await fetch(`/app/v1/user/delete/${currentUser._id}`,{
          method:'DELETE'
        });
        const data=await res.json();
        if(!res.ok){
          dispatch(deleteInFailure(data.message))
        }else{
          dispatch(deleteInSuccess(data));
        }

      } catch (error) {
        dispatch(deleteInFailure(error.message))
      }
    }

    const handleSignout=async()=>{
      try {
        const res=await fetch(`/app/v1/user/signout/${currentUser._id}`,{
          method:'POST'
        });
        const data=await res.json();
        if(!res.ok){
          console.log(data.message)
        }else{
          dispatch(signotuSuccess());
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    console.log(formData)
    return (
      <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.ProfilePicture}
              alt='user'
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                'opacity-60'
              }`}
            />
          </div>
          {imageFileUploadError && (
            <Alert color='failure'>{imageFileUploadError}</Alert>
          )}
          <TextInput onChange={handleChange}
            type='text'
            id='username'
            placeholder='username'
            defaultValue={currentUser.username}
          />
          <TextInput onChange={handleChange}
            type='email'
            id='email'
            placeholder='email'
            defaultValue={currentUser.email}
          />
          <TextInput onChange={handleChange} type='password' id='password' placeholder='password' />
          <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
          </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
          <span onClick={()=>setshowModal(true)} className='cursor-pointer'>Delete Account</span>
          <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
        </div>
          {UpdateUserSuccess && (
            <Alert color='success' className='mt-3'>
              {UpdateUserSuccess}
            </Alert>
          )}

          
          {UpdateUserFailure && (
            <Alert color='failure' className='mt-3'>
              {UpdateUserFailure}
            </Alert>
          )}

          {error && (
            <Alert color='failure' className='mt-3'>
              {error}
            </Alert>
          )}

          <Modal show={showModal} onClose={()=>setshowModal(false)} popup size='md'>
            <Modal.Header/>
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-500 dark:text-gray-400 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account</h3>
                <div className="flex justify-center gap-4">
                  <Button color='failure' onClick={handleDeleteUser}>
                    Yes,I am sure
                  </Button>
                  <Button color='gray' onClick={()=>setshowModal(false)}>
                    No,Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
      </div>
    );
  }



