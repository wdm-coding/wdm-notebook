import { NInput, NCascader, NInputNumber, NSelect, NSwitch, NDatePicker, NTimePicker } from 'naive-ui'
import RadioGroup from './RadioGroup.vue'
import CheckboxGroup from './CheckboxGroup.vue'
import PasswordInput from './PasswordInput.vue'
import TextGroupInput from './TextGroupInput.vue'
const naiveUi = {
	'n-input': NInput,
	'n-cascader': NCascader,
	'n-input-number': NInputNumber,
	'n-select': NSelect,
	'n-switch': NSwitch,
	'n-date-picker': NDatePicker,
	'n-time-picker': NTimePicker,
	'n-radio-group': RadioGroup,
	'n-checkbox-group': CheckboxGroup,
	'n-pwd-input': PasswordInput,
	'n-group-input': TextGroupInput
}
export default name => {
	return naiveUi[name] || resolveComponent(name)
}
