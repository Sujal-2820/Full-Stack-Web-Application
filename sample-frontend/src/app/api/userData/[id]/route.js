// GET specific by id, 
// PUT specific by id, 
// DELETE specific by id

// api/userData/[id]/route.js


import UserData from '../../../../models/userData'; // Adjust the path as necessary
import Connection from '../../../../database/config'; // Adjust the path as necessary
import { NextResponse } from 'next/server';


export async function GET(request, { params }) {
  try {
    await Connection(request); // Ensure the database connection is established
    // Extract the ID from the URL using URLSearchParams
    
    const { id } = params;

    const userData = await UserData.findOne({ _id: id });

    if (!userData) {
      return NextResponse.json({ message: 'User data not found' }, { status: 404 });
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.log('Error while fetching user data:', error.message);
    return NextResponse.json({ message: 'Error fetching user data', error: error.message }, { status: 500 });
  }
}

export async function PUT(request,  { params }) {
  try {
    await Connection(request); // Ensure the database connection is established

    const token = request.cookies.get("token");

    // Extract the value from the token object
    const tokenValue = token ? token.value : null;

    // Check if the token value is present
    if (!tokenValue) {
      throw new Error("Authorization token missing");
    }

    const { id } = params;
    const body = await request.json();

    // Find userData document by id and update it with the new data
    const updatedUserData = await UserData.findByIdAndUpdate(id, body, { new: true });

    if (!updatedUserData) {
      return NextResponse.json({ message: 'User data not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User data updated successfully' }, { status: 200 });
  } catch (error) {
    console.log('Error while updating user data:', error.message);
    return NextResponse.json({ message: 'Error updating user data', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await Connection(request); // Ensure the database connection is established

    const token = request.cookies.get("token");

    // Extract the value from the token object
    const tokenValue = token ? token.value : null;

    // Check if the token value is present
    if (!tokenValue) {
      throw new Error("Authorization token missing");
    }

    const { id } = params;

    // Find userData document by id and delete it
    const deletedUserData = await UserData.findByIdAndDelete(id);

    if (!deletedUserData) {
      return NextResponse.json({ message: 'User data not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User data deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log('Error while deleting user data:', error.message);
    return NextResponse.json({ message: 'Error deleting user data', error: error.message }, { status: 500 });
  }
}
