import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';


const auth = getAuth(app);

function LogIn() {
    const [email , setEmail] = useState("")
    const userSignIn = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
   
        signInWithEmailAndPassword(auth , email , password)
        .then(res => {
            const user = res.user;
            console.log(user)
            alert("You are sign in")
            e.target.reset();
          

        })
        .catch(error => console.error(error.message))
    }
    const userEmail = e =>{
        const email = e.target.value ;
        setEmail(email)
    }
    const resetUserPassword = () =>{
        sendPasswordResetEmail(auth , email)
        .then(res =>{
            alert("please check your email and reset your password")
        })
        .catch(error =>{
            console.error(error.message)
        })
    }
  return (
    <Form className='w-50 mx-auto mt-5' onSubmit={userSignIn}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" onBlur={userEmail} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Login
      </Button>
      <p><span>Forgot password?<button className='btn btn-link' onClick={resetUserPassword}>Reset</button></span></p>
      <p><span>Not a Member? <Link  to="/">Sign Up</Link> </span></p>
    </Form>
  );
}

export default LogIn;