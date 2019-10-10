export default interface IEvent {
	_id: string
	user: string
	location: {
		address: string
		city: string
		country: string
		state: string
	}
	name: string
	description: string
	createdAt: string
	updatedAt: string
}
