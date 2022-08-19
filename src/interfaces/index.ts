export interface ResponseError {
  message: string;
}

export interface Token {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface Track {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}
