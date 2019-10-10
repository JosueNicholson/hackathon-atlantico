import Transcribe, { TranscriptionJob } from "aws-sdk/clients/transcribeservice"
import IAlgumaCoisa from "./IAlgumaCoisa"
import IOutraCoisa from "./IOutraCoisa"

export default class TranscribeService {
    private transcribe: Transcribe
    // private url: string


    constructor() {
        this.transcribe = new Transcribe({ apiVersion: "2017-10-26", region: "us-east-2" })
    }

    public async startTranscriptionJob(sasuke: IAlgumaCoisa): Promise<void> {
        this.transcribe.startTranscriptionJob(sasuke).promise().then(data => {
            console.log(data)
        })
    }
    // public async listTranscriptionJobs(sasuke: IOutraCoisa): Promise<void>{
    //     this.transcribe.listTranscriptionJobs(sasuke).promise().then(data =>{
    //         console.log(data)
    //     })
    // }
}