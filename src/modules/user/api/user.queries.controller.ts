import { Controller, Get } from "@nestjs/common";
import { Paths } from "src/core/api/routes";

@Controller(Paths.user.root)
export class UserQueriesController {}
