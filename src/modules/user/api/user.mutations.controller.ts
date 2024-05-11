import {Controller, Post, Req, Res} from "@nestjs/common";
import {Paths} from "src/api/routes";
import {Request, Response} from "express";

@Controller(Paths.user.root)
export class UserMutationsController {
    @Post()
    login(@Req() request: Request, @Res() response: Response) {
        response.send("Logged in");
    }

    @Post()
    createUser(@Req() request: Request, @Res() response: Response) {
        response.send("Created");
    }
}