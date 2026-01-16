
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
            destination: './images',
            filename: (req, file, cb) => {
                const prefix = `${Date.now()}- ${Math.round(Math.random() * 1000000 )} `;
                const filename = `${prefix}-${file.filename}`
                cb(null, filename)
            }
        }),
    }))
    public uploadFile(@UploadedFile()){

    }
}