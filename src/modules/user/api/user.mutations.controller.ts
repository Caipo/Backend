import {Controller} from "@nestjs/common";
import {Paths} from "src/api/routes";

@Controller(Paths.user.root)
export class UserMutationsController {}