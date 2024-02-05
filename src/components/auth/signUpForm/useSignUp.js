import {useDispatch} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import {getValidationRules} from './validation'
import routerNameList from '@/navigation/routerNameList'
import {useTranslation} from 'react-i18next'

const useSignUp = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const formikInitialValues = {
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  }
  const [isFormChanged, setIsFormChanged] = useState({
    username: false,
    email: false,
    password: false,
    confirm_password: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [dataErrors, setDataErrors] = useState({})
  const [isValidForm, setIsValidForm] = useState(false)
  const {isValid, values, setFieldValue, validateForm, errors, setErrors} =
    useFormik({
      initialValues: formikInitialValues,
      validationSchema: getValidationRules()
    })
  useEffect(() => {
    validateForm(values)
    setIsValidForm(isValid)
  }, [values, errors, isValid])
  const goToScreen = path => {
    if (path) {
      navigation.navigate(path)
    }
  }
  const handleSubmit = async values => {
    if (isValid) {
      const data = {
        username: values?.username,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password
      }
      try {
        setIsLoading(true)
      } catch (err) {
        setDataErrors(err)
      } finally {
        setIsLoading(false)
      }
    }
  }
  const onChangeInput = ({value, name}) => {
    setDataErrors({...dataErrors, [name]: null})
    setFieldValue([name], value)
    setIsFormChanged({...isFormChanged, [name]: true})
  }
  return {
    values,
    dataErrors,
    errors,
    isFormChanged,
    isValidForm,
    handleSubmit,
    onChangeInput,
    goToScreen,
    isLoading
  }
}
export {useSignUp}
