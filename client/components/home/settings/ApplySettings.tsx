import { useGlobalData } from '../../../hooks/useGlobalData'

export function ApplySettings() {
  const { globalData } = useGlobalData()

  function onSave() {
    globalData.settingsData.onSave.forEach((element) => {
      element()
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
