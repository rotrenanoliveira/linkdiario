export class Failure<F, S> {
  readonly reason: F

  constructor(reason: F) {
    this.reason = reason
  }

  isSuccess(): this is Success<F, S> {
    return false
  }

  isFailure(): this is Failure<F, S> {
    return true
  }
}

export class Success<F, S> {
  readonly result: S

  constructor(result: S) {
    this.result = result
  }

  isSuccess(): this is Success<F, S> {
    return true
  }

  isFailure(): this is Failure<F, S> {
    return false
  }
}

export type Either<F, S> = Failure<F, S> | Success<F, S>

export const failure = <F, S>(reason: F): Either<F, S> => new Failure(reason)
export const success = <F, S>(result: S): Either<F, S> => new Success(result)
