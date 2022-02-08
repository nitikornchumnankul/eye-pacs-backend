import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotos } from './eye-photos.entity';
import { EyePhotosRepository } from './eye-photos.repository';

@Injectable()
export class EyePhotosService {
    constructor(
        @InjectRepository(EyePhotosRepository)
        private eyePhotosRepository: EyePhotosRepository
    ) {}

    async uploadEyePhotos(files: Array<Express.Multer.File>): Promise<EyePhotos[]> {
        try {
            let photos: EyePhotos[] = []
            for(let i=0; i<files.length; i++) {
                let {
                    filename,
                    path,
                } = files[i]

                let photo = this.eyePhotosRepository.create({
                    eye_photo_id: filename,
                    path,
                })

                photos.push(photo)
            }

            return await this.eyePhotosRepository.save(photos)
        } catch(e) {
            throw new BadRequestException({
                message: 'Please upload only image files.'
            })
        }
    }
}
