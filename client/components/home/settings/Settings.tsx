import { useState } from 'react'
import { SettingsProps } from '../../../../interfaces'
import { ExitButton } from '../../ExitButton'
import { SettingsOption } from './SettingsOption'
import { useWindowSize } from '@uidotdev/usehooks'
import { ApplySettings } from './ApplySettings'
import { UsageSettings } from './settings-content/UsageSettings'
import { GeneralSettings } from './settings-content/GeneralSettings'
import { APIKeySettings } from './settings-content/APIKeySettings'

export default function Settings(props: SettingsProps) {
  const [settingsContent, setSettingsContent] = useState<JSX.Element>()
  const [selectedID, setSelectedID] = useState(0)
  const size = useWindowSize()

  if (size.width == null || size.height == null) {
    return
  }

  function onSettingsOptionClick(id: number) {
    setSelectedID(id)
    switch (id) {
      case 0:
        setSettingsContent(<GeneralSettings />)
        break
      case 1:
        setSettingsContent(<UsageSettings />)
        break
      case 2:
        setSettingsContent(<APIKeySettings />)
        break
      default:
        throw new Error('Unknown settings content id!')
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
                {size.width >= 750 ? <ApplySettings /> : ''}
              </div>
              <div className="settings-content">{settingsContent}</div>
              {size.width < 750 ? <ApplySettings /> : ''}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
