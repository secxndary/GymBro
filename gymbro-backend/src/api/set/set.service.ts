import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { SetDto } from './dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class SetService {

    constructor(private prisma: PrismaService) { }


    async getSets(user: User) {
        const sets = await this.prisma.set.findMany({
            where: {

            }
        }
        );
        return sets;
    }


    async getSetById(user: User, id: string) {
        const set = await this.prisma.set.findFirst({
            where: { id }
        });
        return set;
    }


    async createSet(user: User, dto: SetDto) {
        // const set = await this.prisma.set.create({

        // });
    }
}