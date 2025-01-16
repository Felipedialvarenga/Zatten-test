import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export async function POST(req: NextRequest) {
    const users = await req.json();
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }
    const createdUsers: User[] = [];

    const createUser = async (user: User) => {
        const client = (await clerkClient())
        const index = user.name.indexOf(' ');
        const firstName = user.name.slice(0, index);
        const lastName = user.name.slice(index + 1);
        const newUser = await client.users.createUser({
            externalId: user.id,
            firstName: firstName,
            lastName: lastName,
            emailAddress: [user.email],
            password: user.password,
          })
        return newUser
    }

    const sleep = async (time: number) => {
        await new Promise(resolve => setTimeout(resolve, time));
    }

    try {   
        users.forEach((user: User) => {
            createUser(user)
            .then(() => {
                createdUsers.push(user)
            }).then(() => {
                sleep(800)
            })
        })

        await new Promise(resolve => setTimeout(resolve, 800));

      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Erro ao criar os usuários, nem todos os usuários foram criados', createdUsers: createdUsers }, { status: 500 })
      }
  
    return NextResponse.json({ message: 'Usuários criados com sucesso'})
  }