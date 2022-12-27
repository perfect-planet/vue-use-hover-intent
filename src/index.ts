import { Ref, watchEffect, ref } from 'vue-demi'

interface optionType {
  sensitivity?: number
  interval?: number
  timeout?: number
}

export function useHoverIntent (
  target: Ref<HTMLElement>,
  options?: optionType,
): Ref<Boolean> {
  const { sensitivity = 6, interval = 100, timeout = 100 } = options ?? {}
  const isHovering = ref(false)

  let x = 0
  let y = 0
  let pX = 0
  let pY = 0
  let timer = 0

  const setIsHovering = (value: boolean) => {
    isHovering.value = value
    return value
  }

  const delay = () => {
    if (timer) {
      clearTimeout(timer)
    }
    return setIsHovering(false)
  }

  const tracker = (e: MouseEvent) => {
    x = e.clientX
    y = e.clientY
  }

  const compare = (e: MouseEvent) => {
    if (timer) {
      clearTimeout(timer)
    }
    if (Math.abs(pX - x) + Math.abs(pY - y) < sensitivity) {
      return setIsHovering(true)
    } else {
      pX = x
      pY = y
      timer = window.setTimeout(() => compare(e), interval)
    }
  }

  const dispatchOver = (e: MouseEvent) => {
    if (timer) {
      clearTimeout(timer)
    }
    if (target.value) {
      target.value.removeEventListener('mousemove', tracker, false)
    }
    if (!isHovering.value) {
      pX = e.clientX
      pY = e.clientY
      if (target.value) {
        target.value.addEventListener('mousemove', tracker, false)
      }
      timer = window.setTimeout(() => compare(e), interval)
    }
  }

  const dispatchOut = () => {
    if (timer) {
      clearTimeout(timer)
    }
    if (target.value) {
      target.value.removeEventListener('mousemove', tracker, false)
    }
    if (isHovering.value) {
      timer = window.setTimeout(() => delay(), timeout)
    }
  }

  watchEffect(() => {
    if (target.value) {
      target.value.addEventListener('mouseover', dispatchOver, false)
      target.value.addEventListener('mouseout', dispatchOut, false)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (target) {
        target.value.removeEventListener('mouseover', dispatchOver, false)
        target.value.removeEventListener('mouseout', dispatchOut, false)
      }
    }
  })

  return isHovering
}
