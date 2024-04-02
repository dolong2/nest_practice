export class PostResDto {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly content: string,
  ) {}
}

export class PostListResDto {
  constructor(readonly list: PostResDto[]) {}
}
