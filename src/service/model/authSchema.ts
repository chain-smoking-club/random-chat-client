// TODO: server api 완성시 수정할 것
export type SignRequestProps = {
  email: string;
  password: string;
};

export type SignUpRequestProps = {
  email: string;
  password: string;
  nickname: string;
};

export type SignResponseProps = {
  access_token: string;
};
