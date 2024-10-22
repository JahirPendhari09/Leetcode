import Select from "react-select";

const customStyles = {
	control: (provided) => ({
		...provided,
		backgroundColor: 'bg-neutral-800',
		border: 'none',
		outline: 'none',
		boxShadow: 'none',
	}),
	singleValue: (provided) => ({
		...provided,
		color: 'white',
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: 'bg-neutral-800',
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? '#4a5568' : 'white',
		color: state.isSelected ? 'white' : 'black',
		'&:hover': {
			backgroundColor: '#a9c0e7',
			color: 'white',
		},
	}),
};

export const SelectDropdown = ({ value, setValue, options }) => {
	return (
		<Select
			placeholder={value.label}
			options={options}
			value={value}
			className="w-[130px] rounded text-sm bg-neutral-500"
			styles={customStyles}
			onChange={(e) => {
				setValue(e);
			}}
			label=''
		/>
	);
}
