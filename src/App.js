import React, {useState, useEffect} from 'react'
import { number, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Characters'
import './App.css'

const App = () => {
  const [password, setPassword] = useState('')
  const [numInp, setNumInp] = useState({
    number: '8',
    isUppercase: false,
    isLowercase: false,
    isNumber: false,
    isSymbol: false,
  })
  const [passArr, setPassArr] = useState([])
  const [textCopyed, setTextCopyed] = useState(false)

  useEffect(() => {

    let numbers = number.split('')
    let uppercaseLetters = upperCaseLetters.split('')
    let lowercaseLetters = lowerCaseLetters.split('')
    let symbols = specialCharacters.split('')

    setPassArr(prev => {
      prev = []
      if(numInp.isUppercase) {
        prev.push(uppercaseLetters)
      }
      if(numInp.isLowercase) {
        prev.push(lowercaseLetters)
      }
      if(numInp.isNumber) {
        prev.push(numbers)
      }
      if(numInp.isSymbol) {
        prev.push(symbols)
      }
      return prev
    })
  }, [numInp])

  const handleChange = (event) => {
      const {name, value, type, checked} = event.target
      setNumInp(prevFormData => {
        let maxLength = 30;
        if(value > maxLength) {
          return {
            ...prevFormData,
            number: maxLength
          }
        }
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
      })
  }

  const handleGeneratePassword = () => {
    setTextCopyed(false)
    if(passArr.length > 0) {
      setPassword(prev => {
        prev = ''
        for(let j = 0; j < numInp.number; j++) {
          let randomArr = passArr[Math.floor(Math.random() * passArr.length)]
          prev += randomArr[Math.floor(Math.random() * randomArr.length)]
        }
        return prev
      })
    }else {
      alert('Please select at least one checkbox')
    }
  }

  return (
    <div className='pass-div'>
      <h2 className='pass-h1'>Password Generator</h2>
      <div style={{display: 'flex'}}>
        <div className='password'>
          <div className='password-div'>{password}</div>
        </div>
        <button 
          className='copy-btn' 
          onClick={() => {
            navigator.clipboard.writeText(password)
            setTextCopyed(true)
          }}
        >{textCopyed ? 'Password Copyed' : 'Copy Password'}</button>
      </div>
      <div className='pass-length'>
        <span>Password length</span>    
        <input type='number' name='number' className='num-inp' value={numInp.number} onChange={handleChange}/>
      </div>
      <div className='checkboxes'>
        <div>
          <label htmlFor='isUppercase'>add uppercase letters</label>
          <input type='checkbox' name='isUppercase' checked={numInp.isUppercase} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor='isLowercase'>add lowercase letters</label>
          <input type='checkbox' name='isLowercase' checked={numInp.isLowercase} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor='isNumber'>include numbers</label>
          <input type='checkbox' name='isNumber' checked={numInp.isNumber} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor='isSymbol'>include symbols</label>
          <input type='checkbox' name='isSymbol' checked={numInp.isSymbol} onChange={handleChange}/>
        </div>
      </div>
      <button className='gen-pass' onClick={handleGeneratePassword}>Generate Password</button>
    </div>
  );
}

export default App;
