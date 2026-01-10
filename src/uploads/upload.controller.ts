
import { Controller, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller("api/uploads")
export class UploadsController {
    //POST: ~/api/uploads
    @Post()
    public uploadFile(){

    }
}