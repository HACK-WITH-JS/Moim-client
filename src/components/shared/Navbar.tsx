import {
  Box,
  Container,
  Divider,
  Flex,
  useDisclosure,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import AuthModal from "../auth/AuthModal";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { UserAuthInfo } from "../../types/user";
import { PATH } from "../../constants/path";

//  max width 1280
function Navbar() {
  const userAuth = useUser();

  return (
    <>
      <Box bg="green.400" color="white" p={4}>
        <Container maxW="1280px">
          <Flex justifyContent="space-between" alignItems="center">
            <Logo />
            {userAuth === undefined ? <RightMenu /> : <Profile />}
          </Flex>
        </Container>
      </Box>
      <Divider />
    </>
  );
}

function RightMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex>
        <Box onClick={onOpen} as="button">
          <Text as="b">로그인</Text>
        </Box>
      </Flex>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

function Profile({ profileImageUrl }: Pick<UserAuthInfo, "profileImageUrl">) {
  const navigate = useNavigate();

  return (
    <Flex>
      <Box as="button" marginRight={4}>
        <Text as="b">새 글쓰기</Text>
      </Box>

      <Menu>
        <MenuButton>
          <Avatar
            src={
              profileImageUrl === null
                ? "https://velog.io/images/user-thumbnail.png" // TODO 기본 이미지로 변경 필요
                : profileImageUrl
            }
          />
        </MenuButton>

        <MenuList style={{ color: "black" }}>
          <MenuItem onClick={() => navigate(PATH.MY_ARTICLES)}>
            <Text>내 작성글</Text>
          </MenuItem>

          <MenuItem onClick={() => navigate(PATH.MY_BOOKMARKS)}>
            <Text>내 관심글</Text>
          </MenuItem>

          <MenuItem onClick={() => navigate(PATH.MY)}>
            <Text>설정</Text>
          </MenuItem>
          {/* TODO 로그아웃 기능 구현 */}
          <MenuItem>
            <Text>로그아웃</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

function Logo() {
  return (
    <Link to="/">
      <Text as="b">로고</Text>
    </Link>
  );
}

export default Navbar;
