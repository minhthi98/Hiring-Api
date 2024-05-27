import { Controller } from "@nestjs/common";
import { LeaveService } from "./leave.service";

@Controller('users')
export class LeaveController {
    constructor(private leaveService: LeaveService) { }
}