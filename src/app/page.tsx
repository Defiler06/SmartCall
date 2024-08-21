'use client';

import { useEffect, useState } from 'react';
import { fetchData } from '@/services';
import IManager from '@/app/interfaces/IManager';
import { Button, message, Row, Space, Typography } from 'antd';
import styles from "./page.module.css";
import { PlusOutlined } from '@ant-design/icons';
import CardManager from '@/components/CardManager';
import ManagerModal from '../components/ManagerModal';

const { Text } = Typography;
export default function Home() {
	const [managers, setManagers] = useState<IManager[]>([]);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentManager, setCurrentManager] = useState<IManager | null>(null);

	const getManagers = async () => {
		try {
			setIsLoading(false);
			const response = await fetchData('manager');
			setManagers(response);
		} catch (e) {
			setManagers([]);
			message.error(e.message);
		} finally {
			setIsLoading(true);
		}
	};

	const deleteManager = async (id) => {
		try {
			await fetchData(`manager/${id}`, { method: 'DELETE' });
			message.success("You have successfully removed the manager");
		} catch (e) {
			setManagers([]);
			message.error(e.message);
		} finally {
			await getManagers();
		}
	};

	const createManager = async (data: { name: string }) => {
		try {
			await fetchData('manager', { method: "POST", data: data })
			message.success("You have successfully created a manager");
		} catch (error) {
			message.success(error.message);
		} finally {
			await getManagers();
			setIsOpenModal(false);
		}
	};

	const updateManager = async (id: string, data: { name: string }) => {
		try {
			await fetchData(`manager/${id}`, { method: "PUT", data: data })
			message.success("You have successfully changed manager data");
		} catch (error) {
			message.success(error.message);
		} finally {
			await getManagers();
			setIsOpenModal(false);
		}
	};

	const renderManagersCards = managers.map((manager) => (
		<CardManager
			key={manager.id}
			name={manager.name}
			deleteManager={() => deleteManager(manager.id)}
			onEdit={() => {
				setIsOpenModal(true);
				setCurrentManager(manager);
			}}
		/>
	));

	useEffect(() => {
		getManagers();
	}, [])

	return (
		<main className={styles.container}>
			{isLoading && <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
				<Row justify="space-between">
					<Button
						type="primary"
						className={styles.button}
						icon={<PlusOutlined/>}
						size="large"
						onClick={() => {
							setCurrentManager(null);
							setIsOpenModal(true);
						}}
					>
						Create manager
					</Button>
					<Button
						type="primary"
						className={styles.button}
						size="large"
						href="/client"
					>
						Clients page
					</Button>
				</Row>
				{managers.length > 0 ? (
					renderManagersCards
				) : (
					<Text type="warning">Менеджеры не найдены</Text>
				)}
			</Space>}
			<ManagerModal
				isModalOpen={isOpenModal}
				handleCancel={() => setIsOpenModal(false)}
				createManager={createManager}
				currentManager={currentManager}
				updateManager={updateManager}
			/>
		</main>
	);
}
