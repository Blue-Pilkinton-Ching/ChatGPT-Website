import EventEmitter from 'events'

export const onApplySettings = new EventEmitter()

export function ApplySettings() {
  function onSave() {
    onApplySettings.emit('save')
  }

  function onCancel() {
    onApplySettings.emit('cancel')
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
