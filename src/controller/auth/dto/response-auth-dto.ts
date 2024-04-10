export class SigninResDto {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}

export class ReissueResponseDto {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}
