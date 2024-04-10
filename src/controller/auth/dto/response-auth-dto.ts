export class SigninResDto {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}

export class ReissueResDto {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}
