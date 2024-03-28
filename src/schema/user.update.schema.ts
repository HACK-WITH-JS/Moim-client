import * as yup from "yup";

const nickName = yup.string().required("닉네임은 필수 입력입니다.");
const position = yup.string().required("직무는 필수 입력입니다.");
const carrer = yup.string().required("경력은 필수 입력입니다.");
const introduce = yup.string();
const stacks = yup
  .array()
  .of(yup.string())
  .max(3, "스택은 최대 3개까지 입력 가능합니다.");
const links = yup
  .array()
  .of(
    yup.object({
      url: yup.string().url("링크는 URL 형식이어야 합니다."),
      description: yup.string(),
    })
  )
  .max(3, "링크는 최대 3개까지 입력 가능합니다.");

export const userUpdateSchema = yup.object().shape({
  nickName,
  position,
  carrer,
  stacks,
  introduce,
  links,
});
