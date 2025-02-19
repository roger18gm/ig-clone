import { Flex,Text,Button,Box,VStack,Image,Input,} from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/tabbinlogo.png" h={24} cursor="pointer" alt="Insta Logo" />

        {/* Display form to Sign up or log in with email and password */}
        {isLogin ? <Login /> : <Signup />}

          {/* Or sign up/log in with Google*/}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <Flex>

            {/* IMPLEMENT THIS VIA SUPABASE */}
            <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
          </Flex>
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account? "}
          </Box>
          <Box
          // Clicking this box changes what form is displayed and other text
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign Up" : "Log in "}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
