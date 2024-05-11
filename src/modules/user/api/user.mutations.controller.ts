import {Controller, Post, Req, Res} from "@nestjs/common";
import {Paths} from "src/core/api/routes";
import {Request, Response} from "express";

@Controller(Paths.user.root)
export class UserMutationsController {
    @Post(Paths.user.mutations.login)
    login(@Req() request: Request, @Res() response: Response) {
        response.send("Logged in");
    }

    @Post(Paths.user.mutations.createUser)
    createUser(@Req() request: Request, @Res() response: Response) {
        response.send("Created");
    }
}