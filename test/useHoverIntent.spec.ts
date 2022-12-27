import { mount } from '@vue/test-utils'
import { ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { useHoverIntent } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

const getElementRef = () => {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useHoverIntent', () => {
  it('accepts an element', () => {
    const element = getElementRef()
    const isHovering = useHoverIntent(element)
    expect(isHovering).toBeDefined()
    expect(isHovering.value).toBe(false)
  })
})
