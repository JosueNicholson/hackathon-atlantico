enum TranscriptionStatus {
  AVAILABLE,
  IN_PROGRESS,
  UNAVAILABLE
}

export default interface ITranscription {
  _id: string
  lecture_id: string
  status: TranscriptionStatus
	title: string
	body: string
	createdAt: Date
}
