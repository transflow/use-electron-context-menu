# use-electron-context-menu

`0` dependencies

## Installation

```bash
npm install use-electron-context-menu
```

_Note_: If you prefer `yarn` instead of `npm`, just use `yarn add use-electron-context-menu`.

## How to use

```tsx
import React, { useRef } from "react"
import useContextMenu from "use-electron-context-menu"

export default function App() {
  const ref = useRef(null)

  useContextMenu(ref, [
    {
      label: "Copy",
      click: () => console.log("copied")
    }
  ])

  return (
    <div ref={ref} style={{ width: 200, height: 100 }}>
      {/* right clicking this area will spawn the context menu */}
    </div>
  )
}
```

## API

```ts
useContextMenu(ref, menuItems, options)
```

### Parameters

- `ref`: React element you want to add the context menu to
- `menuItems`: An array of Electron [menu items](https://www.electronjs.org/docs/api/menu-item)
- `options`: _(optional)_ An object of options for this hook

### Options
