import { Body, Controller, Get, Post } from "@nestjs/common";
import { TimekeepingService } from "./timeKeeping.service";

@Controller('timeKeeping')
export class TimeKeepingController {
    constructor(private timeKeepingService: TimekeepingService){}
    @Post('create')
    async createTimekeeping(@Body() userID: string) {
        return this.timeKeepingService.createTimekeeping(userID);
    }

    @Get('getInMonth')
    async getTimekeepinginMonth(@Body() userID: string, @Body() month: Date) {
        if (!month) {
            month = new Date();
        }
        return this.timeKeepingService.getTimekeepinginMonth(userID, month);
    }                               
}