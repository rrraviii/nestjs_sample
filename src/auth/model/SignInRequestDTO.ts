export interface SignInRequestDTO {
  id: string;
  pwd: string;
}

export const createSignInRequestDTO = ({ id, pwd }: SignInRequestDTO): SignInRequestDTO => ({
  id,
  pwd,
});

export const emptySignInDTO = createSignInRequestDTO({
  id: '',
  pwd: '',
});
