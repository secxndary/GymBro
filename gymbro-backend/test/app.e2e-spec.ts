import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';


describe('E2E Tests', () => {
    let app: INestApplication;
    let prisma: PrismaService;


    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true
        }));

        await app.init();

        prisma = app.get(PrismaService);
        await prisma.cleanDb();

        pactum.request.setBaseUrl('http://localhost:3999');
    });


    afterAll(() => {
        app.close();
    })


    describe('Auth', () => {
        const dto: AuthDto = {
            email: 'secxndary@gmail.com',
            password: '1111'
        }

        describe('Signup', () => {
            it('should sign up', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(201)
                    .inspect();
            })
        });

        describe('Signin', () => {
            it('should sign in', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto)
                    .expectStatus(200)
                    .inspect();
            })
        });
    });


    describe('User', () => {
        describe('Get me', () => { });
        describe('Edit user', () => { });
    });


    describe('Exercise', () => {
        describe('Create exercise', () => { });
        describe('Get exercise', () => { });
        describe('Get exercise by id', () => { });
        describe('Edit exercise', () => { });
        describe('Delete exercise', () => { });
    });

});