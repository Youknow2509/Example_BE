import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import helmet from 'helmet';
import * as csurf from 'csurf';


async function bootstrap() {
    const PORT = 3000;

    const app = await NestFactory.create(AppModule);

    handleSwaggerModuleAPI(app);
    handleLog(app);
    handleHelmet(app);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
        console.log('Server is running on: http://localhost:' + PORT + '/');
        console.log('Swagger is running on: http://localhost:' + PORT + '/api');
    });
}

// Write log in to file 'src/access.log'
const handleLog = (app: any): void => {
    const accessLogStream = fs.createWriteStream(
        path.join(process.env.PATH_LOG, 'access.log'),
        { flags: 'a' },
    );
    app.use(morgan('combined', { stream: accessLogStream }));
};

// Swagger module API
const handleSwaggerModuleAPI = (app: any): void => {
    const title: string = 'V';
    const version: string = '1.0';
    const tag: string = 'V';
    const decription: string = `
            Contact:
            - Mail: lytranvinh.work@gmail.com 
            - Github: https://github.com/Youknow2509 
            Source: 
            - Github: https://github.com/Youknow2509/Example_BE
        `;

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
            description:
                'JWT Authorization header using the Bearer scheme. Example: Bearer <token>',
        })
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(path, app, document);
};

// HelmetJS module for security
const handleHelmet = (app: any): void => {
    app.use(
        helmet({
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: {
                directives: {
                    imgSrc: [
                        `'self'`,
                        'data:',
                        'apollo-server-landing-page.cdn.apollographql.com',
                    ],
                    scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                    manifestSrc: [
                        `'self'`,
                        'apollo-server-landing-page.cdn.apollographql.com',
                    ],
                    frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
                },
            },
        }),
    );
};

// Handle CORS
const handleCors = (app: any): void => {
    // White list for CORS requests globally
    const whitelist: string[] = [
        'https://3000-idx-nestjs-1718477108815.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev/', 
        'https://example.com'
    ];

    const corsOptions = {
        // Chỉ cho phép các yêu cầu từ domain này
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Chỉ cho phép các phương thức này
        allowedHeaders: ['Content-Type', 'Authorization'], // Chỉ cho phép các header này
        credentials: true, // Cho phép gửi cookie
        optionsSuccessStatus: 204 // Một số trình duyệt cũ sẽ không hiểu trạng thái 204

    };
    app.enableCors(corsOptions);
};

// Handle CSRF 
const handleCsrf = (app: any): void => {
    app.use(
        csurf()
    );
};

bootstrap();
