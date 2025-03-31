import { StyleSheet, Text, View,TouchableOpacity ,ScrollView, SafeAreaView, TextInput} from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';



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
    <ScrollView keyboardShouldPersistTaps='handled' style={{flex:1,backgroundColor:'#fff',padding:20}}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{passwordLength:''  }}
        validationSchema={PasswordSchema}
      onSubmit={values=>{
        console.log(values);
        generatePasswordString(+values.passwordLength)//Todo
      }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         
         handleSubmit,
         handleReset,
         
         /* and other goodies */
       }) => (
         
          <>
          <View  style={styles.inputWrapper}>
            <View style={styles.inputColumn}>
              <Text style={styles.heading}>
                Password Length
              </Text>
              {touched.passwordLength && errors.passwordLength&& (
                <Text style={styles.errorText}>{errors.passwordLength}</Text>
              )}
              
            </View>
            <TextInput style={styles.inputStyle}
              value={values.passwordLength}
              onChangeText={handleChange('passwordLength')}
              placeholder="ex.8"
              keyboardType='numeric'/>
          </View>
          <View  style={styles.inputWrapper}>
            //BouncyCheckbox used
            <Text style={styles.heading}>Include Lowercase</Text>
            <BouncyCheckbox
            disableBuiltInState

              
            isChecked={lowercase}
             onPress={() => setLowercase(!lowercase)}
             fillColor='green'
            />
          </View>
          <View  style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Lowercase</Text>
            <BouncyCheckbox
            disableBuiltInState

              
            isChecked={lowercase}
             onPress={() => setLowercase(!lowercase)}
             fillColor='green'
            />
          </View>
          <View  style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Lowercase</Text>
            <BouncyCheckbox
            disableBuiltInState

              
            isChecked={lowercase}
             onPress={() => setLowercase(!lowercase)}
             fillColor='green'
            />
          </View>
          <View  style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Lowercase</Text>
            <BouncyCheckbox
            disableBuiltInState

              
            isChecked={lowercase}
             onPress={() => setLowercase(!lowercase)}
             fillColor='green'
            />
          </View>
          <View style={styles.formActions}>
            <TouchableOpacity
              disabled={!isValid}
                style={styles.primaryButton}
              onPress={handleSubmit}>
              <Text>Generate Password</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.secondarybutton}
            onPress={()=>{
              handleReset();
              resetPasswordSet();
            }}>
              <Text>Reset</Text>
            </TouchableOpacity>

            </View>
          </>
       )}
     </Formik>
        </View>
        {          ispasswordGenerated ?  (
          <View style={styles.passwordGenerated}>
            <Text style={styles.heading}>Result:</Text>
            <Text style={styles.guidemsg}>Long Press to Copy</Text>
            <Text selectable={true} style={styles.passwordText}>{password}</Text>
            

        
          </View>
        ):null}
        
      </SafeAreaView>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({})