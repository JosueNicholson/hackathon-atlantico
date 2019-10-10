import {Request, Response} from "express"
import TranscriptionRepository from "../repositories/TranscriptionRepository"
import ITranscription from "../models/interfaces/ITranscription"


export default class TranscriptionController {
    private transcriptionRepository: TranscriptionRepository

    constructor(){
        this.transcriptionRepository = new TranscriptionRepository()
    }

    create = async (req: Request, res: Response) => {
        console.log("[Transcription] Create Transcription...")
        try{
            let transcription: ITranscription = req.body

            let response: ITranscription = await this.transcriptionRepository.create(transcription)
            
            res.status(201).send({ message: "Success!", data: response}) 
        }catch (e) {
            res.status(500).send({ message: e.message})
        }
    }

}