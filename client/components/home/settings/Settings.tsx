import { useState } from 'react'
import { SettingsProps } from '../../../../interfaces'
import { ExitButton } from '../../ExitButton'
import { SettingsOption } from './SettingsOption'
import { UsageSettings } from './settings-content/UsageSettings'
import { GeneralSettings } from './settings-content/GeneralSettings'
import { APIKeySettings } from './settings-content/APIKeySettings'
import * as db from 'firebase/firestore'

import EventEmitter from 'events'

import { getAuth } from 'firebase/auth'
import { useGlobalRef } from '../../../hooks/useGlobalRef'

export const onSave = new EventEmitter()

export default function Settings(props: SettingsProps) {
  const [selectedID, setSelectedID] = useState(0)
  const globalRef = useGlobalRef()

  function exit() {
    onSave.emit('action')
    props.onExitButton()

    const user = db.doc(
      db.getFirestore(),
      'users/' + getAuth().currentUser?.uid
    )

    db.setDoc(user, globalRef.settings).catch((e) => {
      console.error(e.message)
      alert('Failed to save settings')
    })
  }

  return (
    <>
      {props.show ? (
        <div className="popup-cover">
          <div className="center settings-panel">
            <div className="settings-header">
              <h2 className="settings-header-text">Settings</h2>
              <ExitButton onClick={exit} />
            </div>
            <div className="settings-box">
              <div className="settings-options">
                <SettingsOption
                  icon="images/settings.svg"
                  text="General Settings"
                  id={0}
                  onClick={() => setSelectedID(0)}
                  selected={selectedID === 0}
                />
                <SettingsOption
                  icon="images/chart.svg"
                  text="Usage"
                  id={1}
                  onClick={() => setSelectedID(1)}
                  selected={selectedID === 1}
                />
                <SettingsOption
                  icon="images/key.svg"
                  text="API key settings"
                  id={2}
                  onClick={() => setSelectedID(2)}
                  selected={selectedID === 2}
                />
              </div>
              <div className="settings-content">
                {
                  <>
                    {' '}
                    <GeneralSettings show={selectedID === 0} />
                    <UsageSettings show={selectedID === 1} />
                    <APIKeySettings show={selectedID === 2} />
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
