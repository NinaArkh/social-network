import React, { useState } from 'react'
import styles from './paginator.module.css'
import cn from 'classnames'

const Paginator = ({portionSize = 10, ...props}) => {
  let numberOfPages = Math.ceil(props.total / props.pageSize)

  let pages = []
  for(let i = 1; i <= numberOfPages; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(numberOfPages / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize


  return (
    <div className={styles.pagination}>
      {portionNumber > 1 &&
      <button className={styles.backBtn}
      onClick={() => {setPortionNumber(portionNumber - 1)}}> back </button>
      }

      {pages
      .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
      .map((page) => {
        return <span 
          className={ cn(
            { [styles.selectedPage]: props.currentPage === page }, styles.pageNumber)}
          onClick = {(event) => { props.onPageChanged(page) }}
          key={page}
          onClickCapture={(event) => props.onPageChanged(page)}> {page} </span>
      })}

      {portionCount > portionNumber &&
        <button className={styles.forwardBtn}
        onClick={() => {setPortionNumber(portionNumber + 1)}}> forward </button>
      }
    </div>
  )
}
export default Paginator
//  {props.currentPage === page && styles.selectedPage}