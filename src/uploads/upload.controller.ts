
import { BadRequestException, Controller, Post , UploadedFile, UseInterceptors,Res, Param,Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type {Express,Response} from "express"
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
                const filename = `${prefix}-${file.originalname}`
                cb(null, filename)
            }
        }),

        fileFilter: (req , file , cb) => {
            if(file.mimetype.startsWith('image')){
                cb(null, true)
            }else {
                cb(new BadRequestException('Unsupported file formate'), false)
            }
        },
        limits: {fileSize: 1024 * 1024 * 2} //1 megabyte
    }))
    public uploadFile(@UploadedFile() file: Express.Multer.File){
    if(!file) throw new BadRequestException("no file provided");
    console.log("File upload", {file});
    }

    //GET: /api/:image
    @Get(":image")
    public showUploadedImage(@Param("image") image: string, @Res() res:Response){
        return res.sendFile(image, {root: 'images'})
        
    }
}