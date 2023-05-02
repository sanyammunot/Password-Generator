import './App.css';
import { useState } from "react";
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters';
import {toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Copy_Message } from './message';

function App() {
  const [password,setPassword] = useState('');
  const [passwordLength,setPasswordLength] = useState(20);
  const [includeUppercase,setIncludeUppercase] = useState(false);
  const [includeLowercase,setIncludeLowercase] = useState(false);
  const [includeNumbers,setIncludeNumbers] = useState(false);
  const [includeSymbols,setIncludeSymbols] = useState(false);

  const handleGeneratePassword = (e) => {
    let characterList=''
    
    if (!includeLowercase &&
      !includeUppercase &&
      !includeNumbers &&
      !includeSymbols ) {
        notify("You must select at least one option!",true)
      }

    if(includeLowercase) {
      characterList = characterList+lowerCaseLetters;
    }
    if(includeUppercase) {
      characterList = characterList+upperCaseLetters;
    }
    if(includeNumbers) {
      characterList = characterList+numbers;
    }
    if(includeSymbols) {
      characterList = characterList+specialCharacters;
    }

    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i =0; i<passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password;
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerHTML = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if(hasError) {
      toast.error(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else {
    toast(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
  }
  const handleCopyPassword = (e) => {
    if (password === '') {
      notify("Nothing To Copy",true)
    } 
    else {
      copyToClipboard()
      notify(Copy_Message)
    }
  }

  return (
    <div className="App">
     <div className="container">
      <div className="generator">
        <h2 className="generator-header">
          Password Generator
        </h2>
        <div className="generator-password">
          <h3> {password} </h3>
          <button 
          onClick={handleCopyPassword}
          className="copy-btn">
            <i className='far fa-clipboard'></i>
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="password-strength"> Password Length </label>
          <input
          defaultValue={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          type="number" 
          id="password-strength" 
          name="password-strength" 
          max="20" min="10" />
        </div>
        <div className="form-group">
          <label htmlFor="uppercase"> Include Uppercase letters </label>
          <input
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
          type="checkbox" 
          id="checkbox"  />
        </div>
        <div className="form-group">
          <label htmlFor="lowercase"> Include Lowecase letters </label>
          <input
          checked={includeLowercase}
          onChange={(e) => setIncludeLowercase(e.target.checked)} 
          type="checkbox" 
          id="checkbox"  />
        </div>
        <div className="form-group">
          <label htmlFor="numbers"> Include Numbers </label>
          <input
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
          type="checkbox" 
          id="checkbox"  />
        </div>
        <div className="form-group">
          <label htmlFor="symbols"> Include symbols </label>
          <input
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}

          type="checkbox" 
          id="checkbox"  />
        </div>

        <div className="generate-btn">
          <button onClick={handleGeneratePassword} className="generate-psd"> Generate Password </button>
        
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        
        </div>
      </div>
     </div>
    </div>
  );
}

export default App;
