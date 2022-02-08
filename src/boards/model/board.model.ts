export interface BoardModel {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

export const createBoardDTO = ({ id, title, description, status }: BoardModel): BoardModel => ({
  id,
  title,
  description,
  status,
});

export const emptyBoardDTO = createBoardDTO({
  id: '',
  title: '',
  description: '',
  status: false,
});
