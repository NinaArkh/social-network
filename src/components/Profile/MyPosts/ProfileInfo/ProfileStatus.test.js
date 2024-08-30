import React from 'react'
import reactTestRenderer, {create} from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus Component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status='123test' />)

    const instance = component.getInstance() // только для классовых компонентов
    expect(instance.state.status).toBe('123test')
  })

  test('span should be displayed', () => {
    const component = create(<ProfileStatus status='123test' />)

    const root = component.root
    let span = root.findByType('span')
    expect(span.type).toBe('span')
   // expect(span.children[0]).toBe('123test')
  })

  test('input should not be displayed by default', () => {
    const component = create(<ProfileStatus status='123test' />)

    const root = component.root
    expect(() => {
      root.findByType('input')
    }).toThrow()
  })

  test('input should be displayed when editMode is activated', () => {
    const component = create(<ProfileStatus status='123test' />)
    const root = component.root
    const span = root.findByType('span')

    span.props.onDoubleClick()

    const input = root.findByType('input')
    expect(input.props.value).toBe('123test')
  })

  test('callback is called', () => {
    const mockCallback = jest.fn()
    const component = create(<ProfileStatus status='123test' updateStatus={mockCallback} />)
    const instance = component.getInstance()
    instance.deactivateEditMode()

    expect(mockCallback.mock.calls.length).toBe(1) // проверяем, что колбек вызвался один раз
  })
})
