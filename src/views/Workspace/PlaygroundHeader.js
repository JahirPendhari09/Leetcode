import React from 'react'
import { SelectDropdown } from "../../components/common/Select/Select"
import { LANGUAGES } from "../../static/editor"

const PlaygroundHeader = ({ language, setLanguage, theme, setTheme, themeOptions }) => {

	return (
		<div className='flex items-center text-white justify-between h-12 pl-2  w-full bg-neutral-700 '>
			<div className='flex items-center text-white mx-1 gap-2 '>
				<button className=' rounded font-medium'>
					<SelectDropdown value={language} setValue={setLanguage} options={LANGUAGES} />
				</button>
				<button className=' rounded font-medium'>
					<SelectDropdown value={theme} setValue={setTheme} options={themeOptions} />
				</button>
			</div>
		</div>
	)
}
export default PlaygroundHeader
