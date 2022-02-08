import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { EyePhotos } from './eye-photos.entity';
import { EyePhotosService } from './eye-photos.service';

@Controller('eye-photos')
export class EyePhotosController {
    constructor(private eyePhotosService: EyePhotosService) {}

    @UseGuards(JwtAuthGuard)
    @Post('uploads')
    @UseInterceptors(FilesInterceptor('images'))
    uploadFile(
        @UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<EyePhotos[]> {
        return this.eyePhotosService.uploadEyePhotos(files)
    }
}
