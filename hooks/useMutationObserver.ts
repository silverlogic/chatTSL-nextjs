import { useState, useEffect } from 'react'

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
}

export default function useMutationObserver(
  target: HTMLDivElement | null,
  callback: MutationCallback,
  options = DEFAULT_OPTIONS,
) {
  const [observer, setObserver] = useState<MutationObserver>()

  useEffect(() => {
    const obs = new MutationObserver(callback)
    setObserver(obs)
  }, [callback, options, setObserver])

  useEffect(() => {
    if (!observer) return
    const { config } = options
    try {
      if (target) {
        observer.observe(target, config)
      }
    } catch (e) {
      console.error(e)
    }
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [observer, target, options])
}
