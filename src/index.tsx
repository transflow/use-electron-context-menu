import { MutableRefObject, useCallback, useEffect, useMemo } from "react"
import { remote } from "electron"

const { Menu } = remote

export default function useContextMenu(
  ref: MutableRefObject<HTMLElement>,
  template: Electron.MenuItemConstructorOptions[],
  options: IMenuOptions = {}
) {
  const menu = useMemo(() => Menu.buildFromTemplate(template), [template])

  const { x, y, onContext, onClose } = options

  const handleContext = useCallback(
    (e: MouseEvent) => {
      menu.popup({
        window: remote.getCurrentWindow(),
        x,
        y,
        callback: onClose
      })
      if (onContext) onContext(e)
    },
    [ref.current]
  )

  useEffect(() => {
    const el = ref.current
    if (el) {
      el.addEventListener("contextmenu", handleContext)
    }
    return () => el.removeEventListener("contextmenu", handleContext)
  }, [handleContext])

  const closeMenu = useMemo(() => menu.closePopup, [menu])

  return { closeMenu }
}

interface IMenuOptions {
  x?: number
  y?: number
  onContext?: (e: MouseEvent) => void
  onClose?: () => void
}
