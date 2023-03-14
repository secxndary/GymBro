import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeasurementDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async addMeasurements(dto: MeasurementDto) {
        // const measurements = this.prisma.bodyMeasurement.create({ dto });
    }
}
