import { StyleSheet, Text, View } from 'react-native'
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
    //
  }
  const createPassword = (characters:string,
    passwordLength:number) => {
    //
  }
  const resetPassword = () => {
    //
  }
  


  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})