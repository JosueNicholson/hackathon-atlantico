export default interface ILecture {
	_id: string
	event_id: string
	speaker_id: string
	file_id?: string
	transcription_id?: string
	abstract_id?: string
	date: Date
	title: string
	status: string
	description: string
	createdAt: Date
	updatedAt: Date
}
