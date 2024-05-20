import {Controller, Post, Req, Res} from "@nestjs/common";
import {Paths} from "src/core/api/routes";
import {createUser} from "src/modules/user/domain/user.service";
import {Request, Response} from "express";

@Controller(Paths.user.root)
export class UserMutationsController {
    @Post(Paths.user.mutations.login)
    login(@Req() request: Request, @Res() response: Response) {
        response.send("Logged in");
    }

    @Post(Paths.user.mutations.createUser)
    createUser(@Req() request: Request, @Res() response: Response) {

        const query = request['query']; 

        if (!('userName' in query && 'password' in query)){
            response.sendStatus(400);
        }
        
        const userName = typeof query['userName'] === 'string' ? query['userName'] : '';
        const password = typeof query['password'] === 'string' ? query['password'] : '';

        createUser(userName, password); 
        response.sendStatus(201);
    }
}
