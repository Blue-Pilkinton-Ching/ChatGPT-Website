import { useGlobalData } from '../../../hooks/useGlobalData'
import { useTriggerRender } from '../../../hooks/useTriggerRender'

export function ApplySettings() {
  const { globalData } = useGlobalData()
  const settingsSaved = useTriggerRender()

  console.log('triggering')

  function onSave() {
    globalData.settingsData.onSave.forEach((element) => {
      element()
    })
    settingsSaved.triggerNextRender(() => {
      console.log('triggering')
      console.log(globalData)
    })
  }

  function onCancel() {
    globalData.settingsData.onSave.forEach((element) => {
      element()
    })
  }

  return (
    <div className="apply-settings-container">
      <div className="save-settings apply-settings">
        <button
          onClick={onSave}
          className="save-button apply-settings-button text"
        >
          Save
        </button>
      </div>
      <div className="revert-settings apply-settings">
        <button
          onClick={onCancel}
          className="revert-button apply-settings-button text"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
