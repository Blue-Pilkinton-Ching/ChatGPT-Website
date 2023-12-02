import { useState, KeyboardEvent, useEffect } from 'react'
import {
  Settings as SettingsInterface,
  SettingsProps,
} from '../../../../interfaces'
import { ExitButton } from '../../ExitButton'
import { SettingsOption } from './SettingsOption'
import { useWindowSize } from '@uidotdev/usehooks'
import { ApplySettings } from './ApplySettings'
import { useGlobalData } from '../../../hooks/useGlobalData'

export default function Settings(props: SettingsProps) {
  const [settingsContent, setSettingsContent] = useState<JSX.Element>()
  const [selectedID, setSelectedID] = useState(0)
  const size = useWindowSize()
  const { globalData, setGlobalData } = useGlobalData()
  const [settingsValues, setSettingsValues] = useState<SettingsInterface>()

  useEffect(() => {
    globalData.settingsData.onSave.push(() => {
      onSave()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSave() {
    const updatedGlobalData = {
      ...globalData,
      settingsData: {
        ...globalData.settingsData,
        settings: {
          ...globalData.settingsData.settings,
          apiKey: 'asdasd',
        },
      },
    }
    setGlobalData(updatedGlobalData)
  }

  if (size.width == null || size.height == null) {
    return
  }

  const generalSettings = <></>
  const usageSettings = <></>
  const apiKeySettings = (
    <>
      <textarea
        onChange={(event) => {
          setSettingsValues({
            ...settingsValues,
            apiKey: event.currentTarget.value,
          })
        }}
        onKeyDown={onKeyDown}
        className="api-key-text text"
        placeholder="Paste your OpenAI API key..."
        wrap="off"
      />
    </>
  )

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  function onSettingsOptionClick(id: number) {
    setSelectedID(id)
    switch (id) {
      case 0:
        setSettingsContent(generalSettings)
        break
      case 1:
        setSettingsContent(usageSettings)
        break
      case 2:
        setSettingsContent(apiKeySettings)
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
