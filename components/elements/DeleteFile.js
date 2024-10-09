
'use client'
import { useEffect } from 'react'

const DeleteFile = () => {
	useEffect(() => {
		const handleClick = (e) => {
			e.preventDefault()
			if (e.target.classList.contains('remove-file')) {
				const fileDelete = e.target.closest('.file-delete')
				if (fileDelete) {
					fileDelete.remove()
				}
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [])

	return null
}

export default DeleteFile
