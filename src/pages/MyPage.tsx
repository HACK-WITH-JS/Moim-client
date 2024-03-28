import {
  Avatar,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../hooks/useUser";
import { userUpdateSchema } from "../schema/user.update.schema";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "../types/user";
import { userAPI } from "../api/user.api";
import { useNavigate } from "react-router-dom";

//TODO yup랑 react-hook-form 사용해서 validation 추가하기
// TODO 지금 쓸데없이 린트끄는 옵션이 많은데 정리 필요 일단 진행
// TODO 링크랑 회원 데이터 관련해서 고도화 진행 필요함.
function MyPage() {
  const userAuth = useUser();
  const navigate = useNavigate();

  if (userAuth === undefined) return null;

  const { profileImageUrl, nickName, links, stacks } = userAuth;

  // Private 라우터 타고 와서 이거는 무조건 호출 됨
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedTechStacks, setSelectedTechStaks] = useState<string[]>([
    ...stacks,
  ]);

  // Private 라우터 타고 와서 이거는 무조건 호출 됨
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputLinks, setInputLinks] = useState<Link[]>([...links]);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    // Private 라우터 타고 와서 이거는 무조건 호출 됨
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
  });

  // TODO 여기 타입 만드는게 좀 어렵네 일단 패스
  const onSubmit = async (data: any) => {
    const requestInput = {
      ...userAuth,
      ...data,
      career: data.carrer === "10년 이상" ? 9999 : parseInt(data.carrer[0]), // TODO 이건 좀 아닌데..?
      profileImageUrl: "/",
    };

    console.log(requestInput);

    try {
      await userAPI.update(requestInput);
      navigate("/");
    } catch (e) {
      alert("프로필 업데이트에 실패했습니다.");
      console.log(e);
    }
  };

  // TechStack은 최대 3개까지만 선택 가능하도록 제한
  const onChangeTechStackHadnler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (selectedTechStacks.length > 3) {
      selectedTechStacks.shift();
    }

    const newTechStacks = [...selectedTechStacks, e.target.value];
    setSelectedTechStaks(newTechStacks);
    setValue("stacks", newTechStacks);
  };

  const onChangeLinksHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newLinks = inputLinks.map((link, i) =>
      i === index ? { ...link, url: e.target.value } : link
    );
    setInputLinks(newLinks);
    setValue("links", newLinks);
  };

  const onChangeLinkDescriptionHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newLinks = inputLinks.map((link, i) =>
      i === index ? { ...link, description: e.target.value } : link
    );
    setInputLinks(newLinks);
    setValue("links", newLinks);
  };

  // 링크는 최대 3개까지 추가 가능
  const onClickLinkAddHandler = () => {
    if (inputLinks.length >= 3) {
      return;
    }
    setInputLinks([...inputLinks, { url: "", description: "" }]);
  };

  // 링크 다 삭제 가능
  const onClickLinkDeleteHandler = (index: number) => {
    if (inputLinks.length <= 1) {
      setInputLinks([]);
      return;
    }
    const newLinks = inputLinks.filter((_, i) => i !== index);
    setInputLinks(newLinks);
    setValue("links", newLinks);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w="50%"
        margin={"16px auto"}
      >
        <Box>
          <Avatar
            src={
              profileImageUrl === null
                ? "https://velog.io/images/user-thumbnail.png" // TODO 기본 이미지로 변경 필요
                : profileImageUrl
            }
          />
        </Box>

        <Box mt={4} w="100%" textAlign="center">
          <Text fontSize="xl" as="b">
            {nickName}님 환영해요~!
          </Text>
        </Box>

        {/* 닉네임 */}
        <Controller
          name="nickName"
          control={control}
          render={({ field }) => (
            <Box mt={4} w="100%">
              <FormControl isRequired>
                <FormLabel>닉네임</FormLabel>
                <Input placeholder="닉네임" {...field} />
              </FormControl>
            </Box>
          )}
        />

        {/* 직무 */}
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <Box mt={4} w="100%">
              <FormControl>
                <FormLabel>직무</FormLabel>
                <Select {...field}>
                  <option>프론트엔드</option>
                  <option>백엔드</option>
                  <option>디자이너</option>
                  <option>IOS</option>
                  <option>안드로이드</option>
                  <option>데브옵스</option>
                  <option>PM</option>
                  <option>기획자</option>
                </Select>
              </FormControl>
            </Box>
          )}
        />

        {/* 경력 */}
        <Controller
          name="carrer"
          control={control}
          render={({ field }) => (
            <Box mt={4} w="100%">
              <FormControl isRequired>
                <FormLabel>경력</FormLabel>
                <Select {...field}>
                  <option>0년</option>
                  <option>1년</option>
                  <option>2년</option>
                  <option>3년</option>
                  <option>4년</option>
                  <option>5년</option>
                  <option>6년</option>
                  <option>7년</option>
                  <option>8년</option>
                  <option>9년</option>
                  <option>10년 이상</option>
                </Select>
              </FormControl>
            </Box>
          )}
        />

        {/* 자기소개 */}
        <Controller
          name="introduce"
          control={control}
          render={({ field }) => (
            <Box mt={4} w="100%">
              <FormControl>
                <FormLabel>자기소개</FormLabel>
                <Textarea placeholder="자기소개를 입력 해주세요" {...field} />
              </FormControl>
            </Box>
          )}
        />

        {/* 관심 스택 최대 3가지*/}
        {/* TODO 아이디어는 여기 이친구는 UI만 담당하고 상태는 따로 관리하는거지 오케이 굿 setValue 이용할 예정 아래 링크도 같은 논리로 해결 가능*/}
        <Box mt={4} w="100%">
          <FormControl isRequired>
            <FormLabel>관심 스택</FormLabel>
            <Select onChange={onChangeTechStackHadnler}>
              <option>JavaScript</option>
              <option>TypeScript</option>
              <option>React</option>
              <option>Vue</option>
              <option>Node</option>
              <option>Express</option>
              <option>Nestjs</option>
              <option>Java</option>
              <option>Spring</option>
              <option>Go</option>
              <option>C</option>
              <option>Python</option>
              <option>Django</option>
              <option>Switft</option>
              <option>Flutter</option>
              <option>React Native</option>
              <option>GraphQL</option>
              <option>Git</option>
              <option>Docker</option>
              <option>Kubernetes</option>
              <option>MySQL</option>
              <option>Postgresql</option>
              <option>MongoDB</option>
              <option>Redis</option>
              <option>AWS</option>
            </Select>
          </FormControl>
        </Box>

        {/* 링크 링크는 최대 3개만 가질 수 있어야 함 현재 유저가 원하는 링크의 수를 상태 값으로 관리해서 렌더링 할 것*/}
        <Flex justify={"flex-start"} w="100%" mt={4}>
          <Text textAlign={"left"}>링크</Text>
        </Flex>
        {inputLinks.map((link, index) => (
          <Box mt={4} w="100%" key={index}>
            <FormControl isRequired>
              <Flex>
                <Input
                  placeholder="http://www.naver.com"
                  value={link.url}
                  onChange={(e) => onChangeLinksHandler(e, index)}
                />
                <Select
                  w="150px"
                  ml={4}
                  mr={4}
                  onChange={(e) => onChangeLinkDescriptionHandler(e, index)}
                >
                  <option>Link</option>
                  <option>Github</option>
                  <option>Notion</option>
                  <option>LinkedIn</option>
                  <option>Instagram</option>
                  <option>Branch</option>
                  <option>Twitter</option>
                  <option>Youtube</option>
                </Select>
                <Button
                  colorScheme="green"
                  onClick={() => onClickLinkDeleteHandler(index)}
                >
                  삭제
                </Button>
              </Flex>
            </FormControl>
          </Box>
        ))}

        {/* 링크 추가 */}
        <Box mt={4} w="100%">
          <Flex alignItems="center">
            <IconButton
              aria-label="Add to friends"
              icon={<AddIcon />}
              onClick={onClickLinkAddHandler}
            />
            <Text ml={4}>링크 추가</Text>
          </Flex>
        </Box>

        {/* 프로필 저장 */}
        <Box mt={4} w="100%">
          <Button colorScheme="green" w="100%" type="submit">
            프로필 저장
          </Button>
        </Box>
        {/* 회원 탈퇴 */}
        <Box mt={4} mb={8} w="100%">
          <Button colorScheme="green" w="100%" variant="outline">
            <Text color="green">회원 탈퇴</Text>
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default MyPage;
