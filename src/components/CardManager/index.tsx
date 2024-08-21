import { Button, Card, Row, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import IClient from '@/app/interfaces/IClient';

interface IPropsCardManager {
	name: string;
	deleteManager: () => void;
	onEdit: () => void;
}

const { Title } = Typography;

export default function CardManager ({ name, deleteManager, onEdit }: IPropsCardManager) {
	return (
		<Card>
			<Row justify="space-between" align="middle">
				<Title level={4}>{name}</Title>
				<Row className={styles.buttonContainer}>
					<Button
						icon={<EditOutlined/>}
						onClick={onEdit}
					>
						Edit
					</Button>
					<Button
						danger
						icon={<DeleteOutlined/>}
						onClick={deleteManager}
					>
						Delete
					</Button>
				</Row>
			</Row>
		</Card>
	);
};