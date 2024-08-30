import React from 'react'
import styles from './preloader.module.css'
import spinner from '../../../img/loading_spinner.svg'

const Preloader = (props) => {
  return (
    <>
      <img  src={spinner} className={styles.spinner} />
    </>
  )
}

export default Preloader