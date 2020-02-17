import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import {join, dirname} from "path"
import { createWriteStream, WriteStream } from "fs";
import {staticDirPath} from "../config/config";

@Injectable()
export class UploadService {
    constructor() {}

    async getUrl(file) {
        const staticFilePath: string = await this.saveFile(file);
        return {
            error_code: 0,
            data: {
                fileUrl: staticFilePath
            }
        }
    }
    
    async saveFile(file): Promise<string> {
        const datetime: number = Date.now();
        const fileName: string = datetime+file.originalname;
        const fileBuffer: Buffer = file.buffer;
        const filePath: string = join(__dirname,'../../public/','static',fileName);
        const staticFilePath: string = staticDirPath + fileName;
        const writeFile: WriteStream = createWriteStream(filePath);
        return await new Promise((resolve,reject)=> {
            writeFile.write(fileBuffer,(error: Error) => {
                if(error) {
                    throw new HttpException('文件上传失败',HttpStatus.FORBIDDEN);
                } 
                resolve(staticFilePath);
            });
        })        
    }
}