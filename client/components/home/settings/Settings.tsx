import { useState } from 'react'
import { SettingsProps } from '../../../../interfaces'
import { ExitButton } from '../../ExitButton'
import { SettingsOption } from './SettingsOption'

const defaultSettingsContent = (
  <>
    <input type="text" className="api-key-text" />
  </>
)

export default function Settings(props: SettingsProps) {
  const [settingsContent, setSettingsContent] = useState(defaultSettingsContent)
  const [selectedID, setSelectedID] = useState(0)

  function onSettingsOptionClick(id: number) {
    setSelectedID(id)
    switch (id) {
      case 0:
        setSettingsContent(defaultSettingsContent)
        break
      default:
        break
    }
  }

  return (
    <>
      {props.show ? (
        <div className="popup-cover">
          <div className="center settings-panel">
            <div className="settings-header">
              <h2 className="settings-header-text">Settings</h2>
              <ExitButton onClick={props.onExitButton} />
            </div>
            <div className="settings-box">
              <div className="settings-options">
                <SettingsOption
                  icon="images/settings.svg"
                  text="General Settings"
                  id={0}
                  onClick={onSettingsOptionClick}
                  selected={selectedID === 0}
                />
                <SettingsOption
                  icon="images/chart.svg"
                  text="Usage"
                  id={1}
                  onClick={onSettingsOptionClick}
                  selected={selectedID === 1}
                />
                <SettingsOption
                  icon="images/key.svg"
                  text="API key settings"
                  id={2}
                  onClick={onSettingsOptionClick}
                  selected={selectedID === 2}
                />
              </div>
              <div className="settings-content">{settingsContent}</div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
