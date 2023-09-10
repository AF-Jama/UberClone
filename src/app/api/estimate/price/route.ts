import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/navigation";


export async function GET(req:NextRequest){
    const a = req.nextUrl.searchParams.get('distance');

    return NextResponse.json({
        a:a,
    })
}