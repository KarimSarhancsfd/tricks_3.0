
import { Controller, Post , UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {Express} from "express"
import { diskStorage } from 'multer';


@Controller("api/uploads")
export class UploadsController {
    //POST: ~/api/uploads
    @Post()
    @UseInterceptors (FileInterceptor("file", {
        storage: diskStorage({
            destination: './images'
        })
    }))
    public uploadFile(){

    }
}