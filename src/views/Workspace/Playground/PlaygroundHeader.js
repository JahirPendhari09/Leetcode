import { useState, useEffect } from "react"
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai"
import React from 'react'
import { SelectDropdown } from "../../../components/common/Select/Select"
import { LANGUAGES } from "../../../static/editor"
import SettingsModal from "../../../components/Modals/SettingsModal"

const PlaygroundHeader = ({ setSettings, settings, language, setLanguage, theme, setTheme, themeOptions }) => {
	const [isFullScreen, setIsFullScreen] = useState(false)

	const handleFullScreen = () => {
		if (isFullScreen) document.exitFullscreen()
		else document.documentElement.requestFullscreen()
		setIsFullScreen(!isFullScreen)
	};

	useEffect(() => {
		function exitHandler(e) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false)
				return
			}
			setIsFullScreen(true)
		}
		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler)
			document.addEventListener("webkitfullscreenchange", exitHandler)
			document.addEventListener("mozfullscreenchange", exitHandler)
			document.addEventListener("MSFullscreenChange", exitHandler)
		}
	}, [isFullScreen])

	return (
		<div className='flex items-center text-white justify-between h-11 w-full '>
			<div className='flex items-center text-white mx-1 gap-4'>
				<button className=' rounded font-medium bg-neutral-600'>
					<SelectDropdown value={language} setValue={setLanguage} options={LANGUAGES} />
				</button>
				<button className=' rounded font-medium bg-neutral-600'>
					<SelectDropdown value={theme} setValue={setTheme} options={themeOptions} />
				</button>
			</div>
			<div className='flex items-center m-2 gap-4 justify-center'>
				<button
					className='preferenceBtn group'
					onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
				>
					<div className='text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting size={22} />
					</div>
				</button>
				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='text-dark-gray-6 font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen size={22} /> : <AiOutlineFullscreenExit size={22} />}
					</div>
				</button>
			</div>
			{settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
		</div>
	)
}
export default PlaygroundHeader


