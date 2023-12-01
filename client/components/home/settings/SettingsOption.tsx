import { SettingsOptionProps } from '../../../../interfaces'

export function SettingsOption(props: SettingsOptionProps) {
  function onClick() {
    props.onClick(props.id)
  }

  return (
    <button
      className={`settings-option ${
        props.selected ? 'settings-option-selected' : ''
      }`}
      onClick={onClick}
    >
      <img
        className="settings-option-icon"
        src={props.icon}
        alt={`${props.text} icon`}
      />
      <h4>{props.text}</h4>
    </button>
  )
}
