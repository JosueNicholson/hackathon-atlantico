enum AbstractStatus {
	AVAILABLE,
	IN_PROGRESS,
	UNAVAILABLE
}

export default interface IAbstract {
	_id: string
	lecture_id: string
	status: AbstractStatus
	title: string
	body: string
	createdAt: Date
	updatedAt: Date
}
