import { NightwatchBrowser } from 'nightwatch'
import EventEmitter from "events"

/*
  Check if the last log in the console contains a specific text
*/
class JournalLastChildIncludes extends EventEmitter {
  command (this: NightwatchBrowser, val: string): NightwatchBrowser {
    this.api
    .waitForElementVisible('*[data-id="terminalJournal"] > div:last-child', 10000)
    .pause(5000)
    .getText('*[data-id="terminalJournal"] > div:last-child', (result) => {
      console.log('JournalLastChildIncludes', result.value)
      if (typeof result.value === 'string' && result.value.indexOf(val) === -1) return this.api.assert.fail(`wait for ${val} in ${result.value}`)
      else this.api.assert.ok(true, `<*[data-id="terminalJournal"] > div:last-child> contains ${val}.`)
      this.emit('complete')
    })
    return this
  }
}

module.exports = JournalLastChildIncludes
