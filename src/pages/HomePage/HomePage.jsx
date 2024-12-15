import { Box, Flex, Container, Text } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";

const HomePage = () => {
  // console.log(supabase);

  const [fetchError, setFetchError ] = useState(null)
  const[userPosts, setUserPosts] = useState(null)

  useEffect(() => {
    const fetchUserPosts = async () => {
      const { data,error } = await supabase
      .from("test_table")
      .select()

      if (error) {
        setFetchError("Could not fetch the posts data")
        setUserPosts(null)
        console.log(error)
      }

      if (data) {
        setUserPosts(data)
        setFetchError(null)
      }
    }

    fetchUserPosts()
  }, [])

  return (
    <Container maxW={"container.lg"}>
      <Box border={"1px solid green"} flex={2} py={10}>
        {fetchError && (<Text>{fetchError}</Text>)}
        {userPosts && (<Box>{userPosts.map(userPost => (<Text>{userPost.title}</Text>))} </Box>)}
      </Box>
    <Flex gap={20}>
        <Box flex={2} py={10} border={"1px solid blue"}>
            <FeedPosts />
        </Box>
        <Box flex={3} mr={20} display={{base:"none", lg:"block"}} maxW={"300px"} border={"1px solid red"}>
            <SuggestedUsers/>
        </Box>
    </Flex>

    </Container>
  );
};

export default HomePage;
