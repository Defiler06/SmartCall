export const dataFields = [
	{
		type: 'TEXT',
		label: 'Name',
		name: 'name',
	},
	{
		type: 'DATE',
		label: 'Date of birth',
		name: 'date_of_birth',
	},
	{
		type: 'PHONE',
		label: 'Phone',
		name: 'phone',
	},
	{
		type: 'DICTI',
		label: 'Gender',
		name: 'gender',
		dicti: [
			{
				value: 'male',
				label: 'Male'
			},
			{
				value: 'female',
				label: 'Female'
			}
		]
	},
	{
		type: 'DICTI',
		label: 'Status',
		name: 'status',
		dicti: [
			{
				value: 'active',
				label: 'Active'
			},
			{
				value: 'archive',
				label: 'Archive'
			},
			{
				value: 'pending',
				label: 'Pending'
			}
		]
	},
	{
		type: 'DICTI',
		label: 'Manager',
		name: 'manager_id',
		dicti: [],
	},
]