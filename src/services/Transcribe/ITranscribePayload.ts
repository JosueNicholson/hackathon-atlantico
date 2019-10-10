export default interface ITranscribePayload {
	LanguageCode: string
	Media: {
		MediaFileUri: string
	}
	TranscriptionJobName: string
	OutputBucketName: string
	MediaFormat: string
}
