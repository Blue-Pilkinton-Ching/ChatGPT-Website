import { SettingsContentProps } from '../../../../../interfaces'

export function GeneralSettings(props: SettingsContentProps) {
  return <>{props.show ? '' : ''}</>
}
