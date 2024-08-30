import React, { PureComponent, memo } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import style from './MyPosts.module.css'
import Post from './Post/Post'

class MyPosts extends PureComponent {

    render() {
    let postsElements = 
      [...this.props.posts]
      .reverse()
      .map(post => {
        return <Post key={post.id} post={post.post} likes={post.likesCount} />
      }
    )
    
    let onAddPost = (values, {resetForm}) => {
      this.props.addPost(values.post)
      resetForm()
    }
    const maxLength = 200

    return (
      <div className = {style.postsBlock}>
      <h3> My posts </h3> 

      <Formik
        initialValues={{ post: '' }}
        validate={values => {
          const errors = {}
          if(!values.post) {
            errors.post = 'Empty post'
          } else if(values.post.length > maxLength) {
            errors.post = `Maximum length of ${maxLength} characters reached`
          }
          return errors 
        }}
        onSubmit = {onAddPost}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur
        }) => {
        return (
          <Form onSubmit={handleSubmit}> 
            <div>
              <Field 
                type='text'
                name='post'
                className={style.inputField}
                maxLength={maxLength + 1}
                autoComplete='off'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.post}
                placeholder='How are you feeling today?' />

              <ErrorMessage
                name='post' component='div' />

              <div>
              <button type='submit'> Add post </button>
            </div>

          </div>
          </Form>
        )}  
      } 
      </Formik>

      <div className= {style.posts}>
        { postsElements }
      </div>
    </div>    
    )
  }
}

export default MyPosts