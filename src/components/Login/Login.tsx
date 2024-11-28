import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage, InjectedFormikProps } from 'formik'
import style from './Login.module.css'
import { loginThunk, logoutThunk, getCaptchaThunk } from "../../redux/auth-reducer"
import { AppStateType } from '../../redux/redux-store'

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export const Login = (props: {isAuth: boolean, loginThunk: any, getCaptchaThunk: any, captchaUrl: string | null } ) => {
  const navigate = useNavigate()
  if(props.isAuth) {
    navigate("/profile")
  }

  interface Values {
    email: string
    password: string
    rememberMe: boolean
    captcha: string 
  }

  return (
    <> 
      <div className={style.loginForm}> 
        <h1> Login </h1>

      <Formik
        initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
        validate={values => {

          const errors: { email?: string, password?: string } = {}
          if(!values.email) {
            errors.email = 'Required field'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address'
          }

          if(!values.password) {
            errors.password = 'Required field'
          }
          return errors
        }}
        onSubmit={(values: Values, { setSubmitting, setStatus }) => {
          props.loginThunk(values.email, values.password, values.rememberMe, values.captcha, setStatus)
          props.getCaptchaThunk()
          .finally(() => {
            setSubmitting(false)
          })
        }} 
      >

      {( ({ 
            values, 
            handleChange, 
            handleBlur,
            handleSubmit,
            isSubmitting,
            setStatus,
            status 
      }) => (

        <form onSubmit={handleSubmit} >
          <div>
            <Field 
              className={style.inputField} 
              name='email' 
              type='text' 
              placeholder='Email'
              value={values.email} 
              onChange={handleChange}
              onBlur = {handleBlur}
            />
            <ErrorMessage className={style.errorField} name='email' component='div' />
          </div>
          <div>
            <Field 
            className={style.inputField} 
            name='password' 
            type='password' 
            autoComplete='on'
            placeholder='Password' 
            value={values.password} 
            onChange={handleChange}
            onBlur = {handleBlur}
          /> 
            <ErrorMessage className={style.errorField} name='password' component='div' />
          </div>
          <div className={style.checkboxField}>
            <Field  
              name='rememberMe' 
              type='checkbox' 
              checked={values.rememberMe}
              onChange={handleChange}
              onBlur = {handleBlur}
            /> Remember me
          </div>

         <div>
           {props.captchaUrl && <img src={props.captchaUrl} />}
           {props.captchaUrl && <Field type='text' name='captcha' placeholder='Please enter captcha symbols' className={style.captcha} />}
         </div>

         {status && status.error && (
            <div className={style.errorField}>
              {status.error} </div>
         )}

          <button type='submit' disabled={isSubmitting}> Login </button>
        </form>
      ))} 

      </Formik>
    </div>
    </>
  )
}

export default connect(mapStateToProps, {loginThunk, logoutThunk, getCaptchaThunk})(Login)