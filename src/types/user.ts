export interface UserAuthInfo {
  email: string;
  nickName: string;
  introduce?: string;
  links: Link[];
  position: string;
  postionOpenStatus: string;
  profileImageUrl?: string;
  stacks: string[];
}

export interface Link {
  url: string;
  description: string;
}
