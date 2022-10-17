
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';




const auth = getAuth(app)


function SignUp() {
   const [error , setError] = useState("");
   const [success , setSuccess] = useState(false)
  const formSubmit = e =>{
    e.preventDefault();
    setSuccess(false)
    const email = e.target.email.value ;
    const password = e.target.password.value;
    
    if(!/^.{6,16}$/.test(password)){
        setError(" must be 6-16 Characters Long.");
        return;
    }
  
    if(!/^(?=.*[A-Z]).*$/.test(password)){
        setError("least one Uppercase Character.");
        return;
    }
    if(!/(?=.*[!@#$&*])/.test(password)){
        setError("passWord must be an special character")
        return;
    }

  
     setError("")
   
    createUserWithEmailAndPassword(auth , email, password)
    .then(result =>{
        const user = result.user ;
        console.log(user);
        setSuccess(true);
        e.target.reset();
        verifyUserEmail()
       
    })
    .catch(error =>{
        console.error(error);
        setError(error.message)
    })
   
  }

  
  const verifyUserEmail = () =>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      alert("Please Veryfy your email address")
    })
  
  }

  return (
    <Form className="mt-5 w-50 mx-auto" onSubmit={formSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email"  required />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" required/>
      </Form.Group>
      {
        success && <p className='text-success'>User creates Successfully</p>
      }
      <p className='text-danger'>{error}</p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p><span>Already have an account  <Link to="/signin">login</Link></span></p>
     
    </Form>
  );
}

export default SignUp;