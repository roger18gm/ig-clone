import { Avatar, Button, Flex, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthUserProfile } from "../../contexts/userProfileContext";

const SuggestedHeader = () => {

  const { signOut } = useAuth(); // supabase signout function
  const { authProfile } = useAuthUserProfile(); // signed-in users authProfile data

  // Alternatively could implement this solution instead so that the component doesn't error when loading the authProfile.username as null
  // if (loading || !authProfile) {
  //   // Optionally, return a loading spinner or placeholder while authProfile is being fetched
  //   return <Text>Loading...</Text>;
  // }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>

            {/* Image avatar link to authProfile */}
            <Link to={`${authProfile?.username || ""}`}>
                <Avatar size={"lg"} src={authProfile?.profile_pic_url} />
            </Link>

            {/* Username link to authProfile */}
            <Link to={`${authProfile?.username || ""}`}>   
                <Text fontSize={12} fontWeight={"bold"}>
                    {authProfile?.username || "User"}
                </Text>
            </Link>
        </Flex>
        
        {/* Sign out button */}
        <Button 
            variant={"ghost"}
            background={"transparent"}
            _hover={{ background: "transparent"}}
            fontSize={14}
            fontWeight={"medium"}
            color={"blue.400"}
            cursor={"pointer"} 
            onClick={signOut}
            >Log Out
        </Button>
    </Flex>
    );
};

export default SuggestedHeader;
