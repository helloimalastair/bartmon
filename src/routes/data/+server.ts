import { transit_realtime } from "$lib";
import type { RequestHandler } from "./$types";

/**
 * Utility API route. Converts Protobuf to JSON, but does not perform additional logic.
 * Does not cache, as data is live.
 */
export const GET: RequestHandler = async () => {
	const gtfsBuffer = await (await fetch("https://api.bart.gov/gtfsrt/tripupdate.aspx")).arrayBuffer();
	return new Response(JSON.stringify(transit_realtime.FeedMessage.decode(new Uint8Array(gtfsBuffer)), (_, v) => typeof v === "bigint" ? Number(v) : v), {
		headers: {
			"content-type": "application/json"
		}
	});
};