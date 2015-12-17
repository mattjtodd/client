// Checks to see if we've launched before (we touch started.txt). If not, write the file and open a browser
import {socketRoot, dataRoot} from '../../react-native/react/constants/platform.native.desktop'
import {helpURL} from '../../react-native/react/constants/urls'
import path from 'path'

import fs from 'fs'
import {shell} from 'electron'

const filePath = path.join(process.platform === win32 ? dataRoot : splashRoot, 'started.txt')

export default () => {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      try {
        fs.writeFileSync(filePath, 'This file gets created on first run of the app')
      }
      catch (e) {
        console.error(`Couldn't mark splash screen shown: ${e}`)
        // if we cant' write this file, let's not show the splash, maybe something weird is going on
        return
      }
      shell.openExternal(helpURL)
    }
  })
}
