
import { Controller, Post , UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {Express} from "express"


@Controller("api/uploads")
export class UploadsController {
    //POST: ~/api/uploads
    @Post()
    @UseInterceptors (FileInterceptor("file"))
    public uploadFile(){

    }
}