import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchEyePhotosDto } from './dto/search-eye-photos.dto';
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
                    eye_photo_id: filename.match(/.*(?=\.(gif|png|jpg|jpeg))/)[0],
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

    async getEyePhotoById(eye_photo_id: string): Promise<EyePhotos> {
        try {
            const photo = await this.eyePhotosRepository.findOne(eye_photo_id)
            return photo
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, Eye photo not found.'
            })
        }
    }

    async getEyePhotos(searchEyePhotosDto: SearchEyePhotosDto): Promise<EyePhotos[]> {
        try {
            const { name } = searchEyePhotosDto
            const query = this.eyePhotosRepository.createQueryBuilder('eye_photos')

            if(name) {
                query.where('(LOWER(eye_photos.eye_photo_id) LIKE LOWER(:name))', { name: `%${name}%` })
            }

            return await query.getMany()
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, Eye photos are empty.'
            })
        }
    }

    async deleteEyePhoto(eye_photo_id: string): Promise<EyePhotos> {
        try {
            const photo = await this.getEyePhotoById(eye_photo_id)
            await this.eyePhotosRepository.delete(eye_photo_id)
            return photo
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, Eye photo not found.'
            })
        }
    }
}
