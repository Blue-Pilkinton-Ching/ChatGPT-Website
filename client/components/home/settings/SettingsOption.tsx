import { SettingsOptionProps } from '../../../../interfaces'

export function SettingsOption(props: SettingsOptionProps) {
  return (
    <button className="settings-option" onClick={() => props.onClick(props.id)}>
      <img
        className="settings-option-icon"
        src={props.icon}
        alt={`${props.text} icon`}
      />
      <h4>{props.text}</h4>
    </button>
  )
}
