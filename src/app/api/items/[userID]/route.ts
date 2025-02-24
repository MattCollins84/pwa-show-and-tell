import { User, UserItem } from "@/context/UserProvider";
import { APIErrorHandler, APIErrorResponse, APISuccessResponse } from "@/lib/API";
import userItemsDB from "@/lib/UserItems";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    userID: string
  }>
}

export async function GET(req: NextRequest, { params }: Params): Promise<NextResponse<APISuccessResponse<User> | APIErrorResponse>> {
  
  const { userID } = await params;

  try {
    const user = {
      id: userID,
      items: userItemsDB.getItems(userID)
    }
    return NextResponse.json({
      data: user
    });
  } catch (error) {
    return APIErrorHandler(error);
  }

}

export async function POST(req: NextRequest, { params }: Params): Promise<NextResponse<APISuccessResponse<User> | APIErrorResponse>> {
  
  const { userID } = await params;

  try {
    const newItem: UserItem = await req.json()

    const userItems = userItemsDB.addItem(userID, newItem);
    const user: User = {
      id: userID,
      items: userItems
    }
    console.log(userItemsDB.items)
    return NextResponse.json({
      data: user
    });
  } catch (error) {
    return APIErrorHandler(error);
  }

}

export async function PUT(req: NextRequest, { params }: Params): Promise<NextResponse<APISuccessResponse<User> | APIErrorResponse>> {
  
  const { userID } = await params;

  try {
    const body: any = await req.json()

    if (body.action === 'add') {
      userItemsDB.incrementItem(userID, body);
    }
    if (body.action === 'subtract') {
      userItemsDB.decrementItem(userID, body);
    }
    const userItems = userItemsDB.getItems(userID);
    const user: User = {
      id: userID,
      items: userItems
    }
    console.log(userItemsDB.items)
    return NextResponse.json({
      data: user
    });
  } catch (error) {
    return APIErrorHandler(error);
  }

}