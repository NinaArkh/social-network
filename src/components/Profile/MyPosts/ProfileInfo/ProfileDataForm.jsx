import React from 'react'
import { Formik, Form, Field } from 'formik'

const ProfileDataForm = ({profile, isOwner, goToEditMode, saveProfile}) => {

  return (
    <div>
      <Formik
        initialValues={{ fullName: '', about: '', github: '', website: ''}} 
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          saveProfile()
        }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <b>Full Name:</b> {profile.fullName}
                <Field type='text' name='fullName' placeholder='Full Name' />
              </div>
              
              
              <div>
                <b>About me:</b> {profile.aboutMe}
                <Field type='text' name='about' placeholder='About me' />
              </div>

              <div>
                <b> GitHub Page:</b> {profile.contacts.github}
                <Field type='text' name='github'  placeholder='Link to GitHub repo' />
              </div>

              <div>
                <b> My website:</b> {profile.contacts.website}
                <Field type='text' name='website' placeholder='Link to your website' />
              </div>
              

              <div>
                <button type='submit' disabled={isSubmitting}>  Save </button>
              </div>
            </Form>
          )}
      </Formik>
    </div>
  )
}
export default ProfileDataForm