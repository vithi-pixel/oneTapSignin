/* global google */
import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';

function OneTapSignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null)

  const onOneTapSignedIn = response => {
    setIsSignedIn(true)
    const decodedToken = jwt_decode(response.credential)
    setUserInfo({...decodedToken})
  }

  const initializeGSI = () => {
    google.accounts.id.initialize({
      client_id: '901907874510-08e1uq39jpmp3d7veovah7kul065n2gc.apps.googleusercontent.com',
      cancel_on_tap_outside: false,
      callback: onOneTapSignedIn
    });

  }

  const signout = () => {
    // refresh the page
    window.location.reload();
  }

  useEffect(() => {
    const el = document.createElement('script')
    el.setAttribute('src', 'https://accounts.google.com/gsi/client')
    el.onload = () => initializeGSI();
    document.querySelector('body').appendChild(el)
  }, [])

  const oneTap = () => {
    
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.log(notification.getNotDisplayedReason())
      } else if (notification.isSkippedMoment()) {
        console.log(notification.getSkippedReason())
      } else if(notification.isDismissedMoment()) {
        console.log(notification.getDismissedReason())
      }
    });
  }
  return (
    <div>
    <img src={logo} className="App-logo" alt="logo" />
              
        { isSignedIn && userInfo ?
          <div>
            Hello {userInfo.name} ({userInfo.email})
            <div className="g-id-signout" onClick={() => signout()}>Sign Out</div>
          </div> :
          <div>You are not signed in
            <div className="g-id-signin" onClick={oneTap}>Sign In</div>
          </div>        
        }
        </div>
  );
}

export default OneTapSignIn;