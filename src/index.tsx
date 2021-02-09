import { MutableRefObject, useCallback, useEffect } from "react"
import { remote } from "electron"

const { Menu } = remote

export default function useContextMenu(
  ref: MutableRefObject<HTMLElement>,
  template: Electron.MenuItemConstructorOptions[]
) {
  const menu = Menu.buildFromTemplate(template)

  const handleContext = useCallback(() => {
    // @ts-ignore
    menu.popup(remote.getCurrentWindow())
  }, [ref.current])

  useEffect(() => {
    const el = ref.current
    if (el) {
      el.addEventListener("contextmenu", handleContext)
    }
    return () => el.removeEventListener("contextmenu", handleContext)
  }, [handleContext])
}
