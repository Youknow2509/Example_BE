import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
    const PORT = 3000;
    
    const app = await NestFactory.create(AppModule);

    handleSwaggerModuleAPI(app);
    handleLog(app);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
        console.log('Server is running on: http://localhost:' + PORT + '/');
        console.log('Swagger is running on: http://localhost:' + PORT + '/api');
    });
}

const handleLog = (app : any): void => {
    const accessLogStream = fs.createWriteStream(path.join(process.env.PATH_LOG, 'access.log'), { flags: 'a' });
    app.use(morgan('combined', { stream: accessLogStream }));
};

const handleSwaggerModuleAPI = (app : any): void => {

    const title: string = 'V';
    const version: string = '1.0';
    const tag: string = 'V';
    const decription: string = 
        `
            Contact:
            - Mail: lytranvinh.work@gmail.com 
            - Github: https://github.com/Youknow2509 
            Source: 
            - Github: https://github.com/Youknow2509/Example_BE
        `

    const path = 'api';

    const config = new DocumentBuilder()
        .setTitle(title)
        .setVersion(version)
        .addTag(tag)
        .setDescription(decription)
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            in: 'header',
            description: 'JWT Authorization header using the Bearer scheme. Example: Bearer <token>',
        })
        .build();
        
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(path, app, document);
};

bootstrap();
