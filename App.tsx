import { StyleSheet, Text, View,TouchableOpacity ,ScrollView, SafeAreaView, TextInput, Image} from 'react-native'
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
    <ScrollView keyboardShouldPersistTaps='handled' style={{flex:1,backgroundColor:'#040e2d',padding:20}}>
      <SafeAreaView style={styles.appContainer}>
      
        <View style={styles.formContainer}>
        <View style={styles.container2}>
          <Text style={styles.title}>Password Generator</Text>
          <Image 
          source={require('./assets/pf1.jpg')}
          style={styles.image}
         

          />
          </View>
          
         
          <Formik
          initialValues={{passwordLength:''}}
          validationSchema={PasswordSchema}
          onSubmit={values=>{
          console.log(values);
          generatePasswordString(+values.passwordLength)//Todo
          }}>
     
          {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         
         
         
          }) => (
           
          <>
          <View  style={styles.inputWrapper}>
            <View style={styles.inputColumn}>
              <Text style={styles.heading3}>
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
            <Text style={styles.heading}>Include Lowercase:</Text>
            <BouncyCheckbox style={styles.checkbox}
            useBuiltInState={false}

              
            isChecked={lowercase}
             onPress={() => setLowercase(!lowercase)}
             fillColor='green'
            />
          </View>
          <View  style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Uppercase:</Text>
            <BouncyCheckbox style={styles.checkbox}
            useBuiltInState={false}

              
            isChecked={uppercase}
             onPress={() => setUppercase(!
              uppercase)}
            
             fillColor='red'
            />
          </View>
          <View  style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers:</Text>
            <BouncyCheckbox style={styles.checkbox}
            useBuiltInState={false}

              
            isChecked={numbers}
             onPress={() => setNumbers(!numbers)}
             fillColor='yellow'
            />
          </View>
          <View  style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols:</Text>
            <BouncyCheckbox style={styles.checkbox}
            useBuiltInState={false}

              
            isChecked={symbols}
             onPress={() => setSymbols(!symbols)}
             fillColor='blue'
            />
          </View>
          <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={() => handleSubmit()}
          >
          <Text style={styles.primaryBtnTxt}>Generate Password</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.secondaryBtn}
            onPress={()=>{
              handleReset();
              resetPassword();
            }}>
              <Text style={styles.secondaryBtnTxt}>Reset</Text>
            </TouchableOpacity>

            </View>
          </>
          )}
          </Formik>
        </View>
        {ispasswordGenerated ? (
          <View style={styles.container3}>
            <Text style={styles.heading}>Generated Password</Text>
            
          <View style={[styles.card, styles.cardElevated]}>
            
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
          </View>
        ) : null}
        
      </SafeAreaView>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  container2:{
    
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',


  },
  image:{
    height:35,
    width:30,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    color:'#fff',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    color:'#a5bace'
  },
  heading3:{
    fontSize: 20,
    color:'#a5bace',
    fontWeight: '600',
    fontFamily: 'sans-serif',
    marginBottom: 5,

  },
  checkbox:{
    marginHorizontal:20
  },

  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
    
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#a5bace',
    color:'#a5bace'
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    marginTop:10,
    width: 300,
    
  },
  cardElevated: {
    backgroundColor: '#bac7db',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
  container3:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 25,
    width:350,
  },
})