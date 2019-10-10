import IRoute from "../base/IRoute"
import RootRoute from "./RootRoute"
import UserRoute from "./UserRoute"
import EventRoute from "./EventRoute"
import SpeakerRoute from "./SpeakerRoute"
import LectureRoute from "./LectureRoute"
import FileRoute from "./FileRoute"
import TranscriptionRoute from "./TranscriptionRoute"

export default class Index {
	public static initRoutes(): IRoute[] {
		let routes: IRoute[] = []

		routes.push(new RootRoute("/"))
		routes.push(new UserRoute("/user"))
		routes.push(new EventRoute("/event"))
		routes.push(new SpeakerRoute("/speaker"))
		routes.push(new LectureRoute("/lecture"))
		routes.push(new FileRoute("/file"))
		routes.push(new TranscriptionRoute("/transcription"))

		return routes
	}
}
