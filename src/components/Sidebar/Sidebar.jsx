import { Avatar, Box, Button, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo, TabbinLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthUserProfile } from "../../contexts/userProfileContext";
// import useSignout from "../../hooks/useSignout"; // decided not to use this hook


const Sidebar = () => {
  
  const { authProfile } = useAuthUserProfile(); // auth user profile details
  const { signOut } = useAuth();
  
  const sidebarItems = [
    
      {
          icon: <AiFillHome size={25} />,
          text: "Home",
          link: "/",
      },
      {
          icon: <SearchLogo />,
          text: "Search"
      },
      {
          icon: <NotificationsLogo />,
          text: "Notifications"
      },
      {
          icon: <CreatePostLogo />,
          text: "Create Post"
      },
      {
          icon: <Avatar size={"sm"} name="Roger Galan" src="rawwyurr2.png" />,
          text: "Profile",
          link: `${authProfile?.username}`
      }
  ]

  return (
    <Box
      h="100vh"
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction="column" gap={10} w="full" height={"full"}>
        <Link
          to="/"
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor="pointer"
        >
          <TabbinLogo />
        </Link>

        <Link
          to="/"
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor="pointer"
          borderRadius={6}
          _hover={{ bg: "whiteAlpha200" }}
          w={10}
        >
          <InstagramMobileLogo />
        </Link>

        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          {sidebarItems.map((item, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                to={item.link || null}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{base:"center", md:"flex-start"}}
              >
                {item.icon}
                <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>

        {/* LOGOUT SECTION */}
        <Tooltip
              hasArrow
              label={"Logout"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              {/* <Link
                display={"flex"}
                // to={"/auth"}
                // as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
              > */}
                <Button display={"flex"}
                  variant={"ghost"}
                  // _hover={{bg:"transparent"}}
                  justifyContent={{base:"center", md:"flex-start"}}
                  onClick={signOut}
                  alignItems={"center"}
                  gap={4}
                  _hover={{ bg: "whiteAlpha.400" }}
                  borderRadius={6}
                  p={2}
                  w={{ base: 10, md: "full" }}
                >
                <BiLogOut size={25} />
                  <Box display={{ base: "none", md: "block" }} color={"whiteAlpha.800"}>Log Out</Box>
                  </Button>
              {/* </Link> */}
            </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
