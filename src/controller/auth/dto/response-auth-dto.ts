export class SigninResponseDto {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}
