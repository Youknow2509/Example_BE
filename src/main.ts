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
    const config = new DocumentBuilder()
        .setTitle('V')
        .setVersion('1.0')
        .addTag('V')
        .setDescription(`
            Contact:
            - Mail: lytranvinh.work@gmail.com 
            - Github: https://github.com/Youknow2509 
            Source: 
            - Github: https://github.com/Youknow2509/Example_BE
        `)
        .build();
        
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
};

bootstrap();
