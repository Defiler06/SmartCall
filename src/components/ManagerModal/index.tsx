import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import IManager from '@/app/interfaces/IManager';


interface IPropsManagerModal {
	isModalOpen: boolean;
	handleCancel: () => void;
	createManager: (data: IManager) => void;
	updateManager?: (id?: string, data: IManager) => void;
	currentManager?: IManager | null;
}

export default function ManagerModal({ isModalOpen, handleCancel, createManager, updateManager, currentManager }: IPropsManagerModal) {
	const [form] = Form.useForm();
	const onFinish = (values: { name: string }) => {
		form.resetFields();
		if (currentManager) {
			updateManager?.(currentManager?.id, values);
		} else {
			createManager(values);
		}
		handleCancel();
	};

	useEffect(() => {
		if (currentManager) {
			form.setFieldsValue(currentManager);
		} else {
			form.resetFields();
		}
	}, [isModalOpen, currentManager, form]);

	return (
		<Modal
			title={currentManager ? "Edit manager" : "Create manager"}
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
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: 'Enter name' }]}
				>
					<Input size="large"/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						size="large"
					>
						{currentManager ? "Edit" : "Create"}
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}