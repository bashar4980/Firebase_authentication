import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import '../../App.css'
import LoginForm from "./Components/Form";

import app from "../../firebase/firebase.init";

const auth = getAuth(app);
const GoogleAndGithub =() =>{
  const [userInfo, setUserInfo] = useState({});
  const provider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const sigInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUserInfo(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const signInGithub = () =>{
    signInWithPopup(auth , gitHubProvider)
    .then(result =>{
      const user = result.user;
      console.log(user);
      setUserInfo(user)
    })
    .catch(error =>{
      console.error(error.message);
    })
  }
  const logOut= () =>{
      signOut(auth)
      .then(()=>{
     
        setUserInfo({})
      })
      .catch(error =>{
        console.error(error)
      })
  }
  return (
    <div className="GoogleGithub">
      <h1>I am Firebase</h1>
      {userInfo.uid ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <>
        <button onClick={sigInGoogle}>Sign Up by google</button>
        <button onClick={signInGithub}>Sign Up by github</button>
        </>
      )}

      <div>
       {
        userInfo.uid &&  <>
        <h1>Name: {userInfo.displayName}</h1>
        <h3>Email: {userInfo.email}</h3>
        <img src={userInfo.photoURL} alt="user"></img>
        <h4>uid: {userInfo.uid}</h4>
        </>
       }
      </div>
      <LoginForm/>
    </div>
  );
}

export default GoogleAndGithub;
