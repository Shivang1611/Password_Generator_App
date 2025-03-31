import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'



// form validation
import * as Yup from 'yup'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
 .min(4,'should be 4 characters long')
  .max(10,'should be 10 characters long')
  .required('Password is required')
  })


export default function App() {
  const [password,setpassword] =useState('')
  const [ispasswordGenerated , setIsPasswordGenerated] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)


  const generatePasswordString =(passwordLength:number) => {
    let charaterList='';

    const upperCaseChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars='abcdefghijklmnopqrstuvwxyz'
    const numberChars='0123456789'
    const symbolChars='!@#$%^&*()_+';
    if (lowercase)
    {
      charaterList += lowerCaseChars
    }
    if (uppercase)
    {
      charaterList += upperCaseChars
    }


    if (numbers)
    {
      charaterList += numberChars
    }
    if (symbols)
    {
      charaterList += symbolChars
    }

    const passwordResult=createPassword(charaterList,passwordLength)
    setpassword(passwordResult)
    setIsPasswordGenerated(true)




  }
  const createPassword = (characters:string,
    passwordLength:number) => {
      let result=''
      for (let i=0;i<passwordLength;i++)
      {
        const charaterIndex=Math.round(Math.random() * characters.length)
        
        result += characters.charAt(charaterIndex)
      }
      return result
    
  }
  const resetPassword = () => {
    setIsPasswordGenerated(false)
    setpassword('')
    setLowercase(true)
    setUppercase(false)
    setNumbers(false)
    setSymbols(false)
  }
  


  return (
    <View>
      <Text>App</Text>
      <TouchableOpacity onPress={() => generatePasswordString(8)}>
        <Text>Generate Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetPassword}>
        <Text>Reset Password</Text>
      </TouchableOpacity>
      <Text>{password}</Text>
      <Text>
        {ispasswordGenerated ? 'Password Generated' : 'No Password Generated'}
      </Text>
       </View>
  )
}

const styles = StyleSheet.create({})