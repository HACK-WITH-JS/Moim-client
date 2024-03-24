import {
  Box,
  Container,
  Divider,
  Flex,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import AuthModal from "../auth/AuthModal";
import { Link } from "react-router-dom";

//  max width 1280
function Navbar() {
  return (
    <>
      <Box bg="green.400" color="white" p={4}>
        <Container maxW="1280px">
          <Flex justifyContent="space-between">
            <Logo />
            <RightMenu />
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
        <Box as="button">
          <Text as="b">새 글쓰기</Text>
        </Box>
        <Box ml={4} onClick={onOpen} as="button">
          <Text as="b">로그인</Text>
        </Box>
      </Flex>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
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
