export class CreateUserRequestDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export class SigninRequestDto {
    readonly email: string;
    readonly password: string;
}