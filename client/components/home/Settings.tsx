import { SettingsProps } from '../../../interfaces'
import { ExitButton } from '../ExitButton'

export default function Settings(props: SettingsProps) {
  return (
    <>
      {props.show ? (
        <div className="popup-cover">
          <div className="center settings-panel">
            <div className="settings-header">
              <ExitButton onClick={props.onExitButton} />
            </div>
            <div className="settings-box"></div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
