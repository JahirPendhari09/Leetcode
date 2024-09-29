import React from "react"

const EditorFooter = ({ handleSubmit,handleRun,disabled }) => {
	return (
		<div className='flex bg-dark-layer-1 absolute  bottom-0 z-10 w-full'>
			<div className='mx-5 my-[10px] flex justify-between w-full text-white '>
				<div className='ml-auto flex items-center space-x-4 text-white'>
					<button
						className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap 
						    transition-all focus:outline-none inline-flex bg-neutral-600  hover:bg-dark-fill-2 
							text-dark-label-2 rounded-lg'
						onClick={handleRun}
					>
						Run
					</button>
					<button
						className='px-3 py-1.5 font-medium items-center transition-all 
						    focus:outline-none inline-flex text-sm text-white bg-green-500 
							hover:bg-green-3 rounded-lg'
						onClick={handleSubmit}
						disabled ={disabled}
						style={{'cursor':disabled && 'not-allowed' }}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}
export default EditorFooter
