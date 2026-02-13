import {Liveblocks} from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import {auth, currentUser} from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(req: Request) {
    const {sessionClaims} = await auth()
    if(!sessionClaims) {
        return new Response("Unauthorized", {status: 401})
    }

    const user = await currentUser()
    if(!user) {
        return new Response("Unauthorized", {status: 401})
    }

    const {room} = await req.json()

    const doc = await convex.query(api.documents.getById, {id: room})
    if(!doc) {
        return new Response("Unauthorized", {status: 401})
    }

    const isOwner = doc.ownerId === user.id
    const isOrganizationMember = !!(doc.organizationId && doc.organizationId === (sessionClaims?.o as any)?.id)

    if(!isOwner && !isOrganizationMember) {
        return new Response("Unauthorized", {status: 401})
    }

    const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous"
    const nameToNumber = name.split("").reduce((acc, word) => acc + word.charCodeAt(0), 0)
    const color = `hsl(${nameToNumber % 360}, 100%, 50%)`

    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name,
            avatar: user.imageUrl,
            color
        }
    })
    session.allow(room, session.FULL_ACCESS)
    const {body, status} = await session.authorize()
    return new Response(body, {status})
}
