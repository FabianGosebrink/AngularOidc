import { TestBed } from "@angular/core/testing";

export enum ApiMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

//API end points define here
export enum ApiEndPoints{
    LOGIN = "auth/token/login/",
    REGISTER = "auth/user/register/",
    TEST = "v1/444cdf93",
    IPADDRESS = "http://api.ipify.org/?format=json",
    IDENTITY = "identity/",
    WEATHER = "weatherforecast/"

}


//API end points define here
export enum Token{
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
}