import { Link, Text } from "@chakra-ui/react";

interface LinkTextProps {
  link: string;
  text: string;
  isExternal?: boolean;
}

function LinkText({ link, text, isExternal }: LinkTextProps) {
  return (
    <Link href={link} isExternal={isExternal}>
      <Text>{text}</Text>
    </Link>
  );
}

export default LinkText;
