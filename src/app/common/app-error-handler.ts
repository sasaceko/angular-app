import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error: any) {
        alert('An unexpected error occuerred.');
        console.log(alert);
    }
}