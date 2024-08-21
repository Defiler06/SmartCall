import { DatePicker, Form, Input, Select } from 'antd';
import InputMask from 'react-input-mask';

const { Option } = Select;
export default function FieldRender({ field }) {
	const renderField = (field) => {
		switch (field.type) {
			case 'TEXT':
				return (
					<Form.Item
						label={field.label}
						name={field.name}
						rules={[{ required: true, message: `Enter ${field.label}` }]}
					>
						<Input size="large" placeholder={`Enter ${field.label}`}/>
					</Form.Item>
				)
			case 'DATE':
				return (
					<Form.Item
						label={field.label}
						name={field.name}
						rules={[{ required: true, message: `Enter ${field.label}` }]}
					>
						<DatePicker
							size="large"
							style={{ width: '100%' }}
							placeholder={`Select ${field.label}`}
						/>
					</Form.Item>
				)
			case 'PHONE':
				return (
					<Form.Item
						label={field.label}
						name={field.name}
						rules={[{ required: true, message: `Enter ${field.label}` }]}
					>
						<InputMask mask="+7 (999)999-99-99" placeholder={`Enter ${field.label}`}>
							{(inputProps) => <Input {...inputProps} size="large"/>}
						</InputMask>
					</Form.Item>
				)
			case 'DICTI':
				return (
					<Form.Item
						label={field.label}
						name={field.name}
						rules={[{ required: true, message: `Enter ${field.label}` }]}
					>
						<Select size="large" placeholder={`Select ${field.label}`}>
							{field?.dicti?.map((value) => {
								return <Option
									key={value.value}
									value={value.value}
								>
									{value.label}
								</Option>
							})}
						</Select>
					</Form.Item>
				);
			default:
				return null;
		}
	};

	return (
		<>
			{renderField(field)}
		</>
	);
};