import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import "./App.css";
import app from "./firebase/firebase.init";

const auth = getAuth(app);
function App() {
  const [userInfo, setUserInfo] = useState({});
  const provider = new GoogleAuthProvider();
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
  const logOut= () =>{
      signOut(auth)
      .then(()=>{
        alert("Successfully log out");
        setUserInfo({})
      })
      .cathch(error =>{
        console.error(error.message)
      })
  }
  return (
    <div className="App">
      <h1>I am Firebase</h1>
      {userInfo.uid ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <button onClick={sigInGoogle}>Sign Up</button>
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
    </div>
  );
}

export default App;
