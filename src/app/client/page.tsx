"use client";
import { Button, message, Row, Select, Space, Table, TableProps } from 'antd';
import styles from '@/app/page.module.css';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchData } from '@/services';
import { useEffect, useState } from 'react';
import IClient from '@/app/interfaces/IClient';
import ClientModal from '@/components/ClientModal';
import dayjs from 'dayjs';


interface DataType {
	id?: string,
	manager_id: string,
	name: string,
	date_of_birth: string,
	phone: string,
	gender: string,
	status: string
}

export default function Page() {
	const [clients, setClients] = useState<IClient[]>([]);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentClient, setCurrentClient] = useState<IClient | null>(null);

	const getClients = async () => {
		try {
			setIsLoading(false);
			const response = await fetchData('client');
			setClients(response);
		} catch (e) {
			setClients([]);
			message.error(e.message);
		} finally {
			setIsLoading(true);
		}
	};

	const deleteClient = async (id) => {
		try {
			await fetchData(`client/${id}`, { method: 'DELETE' });
			message.success("You have successfully removed the client");
		} catch (e) {
			setClients([]);
			message.error(e.message);
		} finally {
			await getClients();
		}
	};
	const createClient = async (data: { name: string }) => {
		try {
			await fetchData('client', { method: "POST", data: data })
			message.success("You have successfully created a manager");
		} catch (error) {
			message.success(error.message);
		} finally {
			await getClients();
			setIsOpenModal(false);
		}
	};

	const updateClient = async (id: string, data: IClient) => {
		try {
			await fetchData(`client/${id}`, { method: "PUT", data: data })
			message.success("You have successfully changed manager data");
		} catch (error) {
			message.success(error.message);
		} finally {
			await getClients();
			setIsOpenModal(false);
		}
	};

	useEffect(() => {
		getClients();
	}, []);

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Date of birth',
			dataIndex: 'date_of_birth',
			key: 'date_of_birth',
			render: (date) => dayjs(date).format('YYYY-MM-DD'),
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			key: 'gender',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			filters: [
				{ text: 'active', value: 'active' },
				{ text: 'pending', value: 'pending' },
				{ text: 'archive', value: 'archive' },
			],
			filterMultiple: false,
			onFilter: (value, record) => record.status === value,
			render: (status) => <span>{status}</span>,
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button
						icon={<EditOutlined/>}
						onClick={() => {
							setIsOpenModal(true);
							setCurrentClient(record);
						}}
					>
						Edit
					</Button>
					<Button
						danger
						icon={<DeleteOutlined/>}
						onClick={() => deleteClient(record.id)}
					>
						Delete
					</Button>
				</Space>
			),
		},
	];

	return (
		<main className={styles.container}>
			{isLoading && <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row justify="space-between">
              <Button
                  type="primary"
                  icon={<PlusOutlined/>}
                  size="large"
                  onClick={() => {
	                  setCurrentClient(null);
										setIsOpenModal(true);
									}}
              >
                  Create client
              </Button>
              <Button
                  type="primary"
                  size="large"
                  href="/"
              >
                  Managers page
              </Button>
          </Row>
          <Table
              pagination={false}
              locale={{ emptyText: 'Данные отсутствуют' }}
              columns={columns}
              dataSource={clients ? clients : []}
              scroll={{ x: 800 }}
          />
      </Space>}
			<ClientModal
				isModalOpen={isOpenModal}
				handleCancel={() => setIsOpenModal(false)}
				currentClient={currentClient}
				createClient={createClient}
				updateClient={updateClient}
			/>
		</main>
	);
}