import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import FieldRender from '@/components/ClientModal/FieldRender';
import { dataFields } from '@/components/ClientModal/helpers/dataFields';
import { fetchData } from '@/services';
import IClient from '@/app/interfaces/IClient';
import dayjs from 'dayjs';


interface IPropsClientModal {
	isModalOpen: boolean;
	handleCancel: () => void;
	currentClient?: IClient | null;
	createClient: (data: IClient) => void;
	updateClient?: (id?: string, data: IClient) => void;
}

export default function ClientModal({ isModalOpen, handleCancel, currentClient, createClient, updateClient }: IPropsClientModal) {
	const [form] = Form.useForm();

	const [fields, setFields] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const managers = await fetchData('manager');
				const updatedFields = dataFields.map(field => {
					if (field.name === 'manager_id') {
						return {
							...field,
							dicti: managers.map(manager => ({
								value: manager.id,
								label: manager.name,
							}))
						};
					}
					return field;
				});
				setFields(updatedFields);
			} catch (error) {
				console.error('Error fetching managers:', error);
			}
		};

		getData();
	}, []);

	const onFinish = (values: IClient) => {
		form.resetFields();
		if (currentClient) {
			updateClient?.(currentClient.id, values);
		} else {
			createClient(values);
		}
		handleCancel();
	};

	useEffect(() => {
		if (currentClient) {
			form.setFieldsValue({
				manager_id: currentClient.manager_id,
				name: currentClient.name,
				date_of_birth: dayjs(currentClient.date_of_birth, 'YYYY-MM-DD'),
				phone: currentClient.phone,
				gender: currentClient.gender,
				status: currentClient.status,
			});
		} else {
			form.resetFields();
		}
	}, [isModalOpen, currentClient, form]);

	return (
		<Modal
			title={currentClient ? "Edit client" : "Create client"}
			open={isModalOpen}
			onCancel={() => {
				form.resetFields();
				handleCancel();
			}}
			centered
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
			>
				{fields.map((field) => (
					<FieldRender key={field.name} field={field}/>
				))}
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						size="large"
					>
						{currentClient ? "Edit" : "Create"}
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}