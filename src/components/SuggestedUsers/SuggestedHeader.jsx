import { Avatar, Button, Flex, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useUserProfile } from "../../contexts/userProfileContext";

const SuggestedHeader = () => {

  const { signOut } = useAuth(); // supabase signout function
  const { profile } = useUserProfile(); // signed-in users profile data

  // Alternatively could implement this solution instead so that the component doesn't error when loading the profile.username as null
  // if (loading || !profile) {
  //   // Optionally, return a loading spinner or placeholder while profile is being fetched
  //   return <Text>Loading...</Text>;
  // }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>

            {/* Image avatar link to profile */}
            <Link to={`${profile?.username || ""}`}>
                <Avatar size={"lg"} src={profile?.profile_pic_url} />
            </Link>

            {/* Username link to profile */}
            <Link to={`${profile?.username || ""}`}>   
                <Text fontSize={12} fontWeight={"bold"}>
                    {profile?.username || "User"}
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
