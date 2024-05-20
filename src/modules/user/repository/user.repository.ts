import { DataSource } from "typeorm"

class User {
    userName : string;
    password : string; 
}


export async function registerUser(user : User) : User{

    await DataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
            { userName: user['userName'], password: user['password'] },
        ])
        .execute()
    

    return user;
}
