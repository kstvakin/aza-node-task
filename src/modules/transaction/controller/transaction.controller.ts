import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {TransactionDto} from "../dto/transaction.dto";
import {TransactionService} from "../service/transaction.service";
import {transactionResponse} from "../interface/interface";
import {ResponseService} from "../../../core/traits";

@Controller('transaction')
export class TransactionController {
    constructor(
        private trnxService: TransactionService,
        private resSrv: ResponseService
    ) {}
    @Post('create')
    async create(@Body() RequestBody: TransactionDto, @Res() res, @Req() req) {
        try {
            const resp:transactionResponse =  await this.trnxService.create(RequestBody);
            return res.status(200)
                .json(this.resSrv.success(resp))
        }catch(error){
            return res.status((error.status || error.response.status) ?? 500)
                .json(this.resSrv.error(error))
        }
    }

    @Get('list')
    async lists(@Res() res, @Req() req) {
        try {
            const resp:transactionResponse =  await this.trnxService.lists(req.query);
            return res.status(200)
                .json(this.resSrv.success(resp))
        }catch(error){
            return res.status((error.status || error.response.status) ?? 500)
                .json(this.resSrv.error(error))
        }
    }

    @Get('list/:id')
    async list(@Res() res, @Req() req) {
        try {
            const resp:transactionResponse =  await this.trnxService.fetchARecord(req.params.id);
            return res.status(200)
                .json(this.resSrv.success(resp))
        }catch(error){
            return res.status((error.status || error.response.status) ?? 500)
                .json(this.resSrv.error(error))
        }
    }
}
