export class SigninResponseDto {
    constructor(
        readonly accessToken: string,
        readonly accessTokenExp: Date,
        readonly refreshToken: string,
        readonly refreshTokenExp: Date
    ){}
}