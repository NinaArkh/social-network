import profileReducer, { addPostActionCreator, deletePostActionCreator } from './profile-reducer'

let state = {
  posts: [
    {id: 1, post: 'This is my first post', likesCount: 15},
    {id: 2, post: 'This is my second post', likesCount: 20}
  ]
}

it('posts length should be incremented', () => {
  // 1. test data
  let action = addPostActionCreator('123test')

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expected result
  expect(newState.posts.length).toBe(3)
})

it('message of the new post should be correct', () => {
  let action = addPostActionCreator('123test')

  let newState = profileReducer(state, action)

  expect(newState.posts[2].post).toBe('123test')
}) 

it('posts length should decrement after post is deleted', () => {
  let action = deletePostActionCreator(1)

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(1)
})